const gettype = require("typeof")
import { IF_TypeJSON, IF_Types } from "./interface"
const merge = require('merge')

const log = console.log

const typeAlias: any = {
  "string": "string",
  "number": "number",
  "num": "number",
  "object": "object",
  "array": "array",
  "uuid": "string",
  "date": "string",
  "url": "string",
  "uri": "string",
  "bool": "boolean",
  "boolean": "boolean"
}

class TypeJSON implements IF_TypeJSON{
  parse(target: any, types: IF_Types): any {
    target = merge(true, target)
    let output:any = {}
    Object.keys(target).forEach(function (key) {
      if (key[0] === '|') {
        types[key.slice(1, key.length)] = target[key]
        delete target[key]
      }
    })
    Object.keys(types).forEach((attr, index) => {
      let sourceAttr: string = attr
      if (sourceAttr.indexOf('*') !== -1) {
        return
      }
      attr = attr.replace(/\?$/, '')
      let attrList = attr.split(".")
      attr = attrList[attrList.length-1]
      // set safe value
      attrList.forEach(function (key, deep) {
        let isLastKey: boolean = deep === attrList.length-1
        let currentPathList = attrList.slice(0, deep+1)
        if (isLastKey) {

        }
        else {
          eval(`target.${currentPathList.join('.')} = target.${currentPathList.join('.')} || {}`)
        }
      })
      let value: any = eval(`target.${attrList.join('.')}`)
      let vartype: string = gettype(value)
      let typeItem: any = types[sourceAttr]
      if (typeof typeItem === "string") {
        interface IF_typeItemStruct {
          type: string
          note: string
        }
        let typeItemStruct:IF_typeItemStruct = {
          type: '',
          note: ''
        }
        let typeAndNote = [];
        if (typeItem.indexOf('|') !== -1) {
          typeAndNote = typeItem.split('|').map(function(value){return value.trim()})
          typeItemStruct.type = typeAndNote[0]
          typeItemStruct.note = typeAndNote[1]
        }
        else {
          typeItemStruct.type = typeItem
        }
        typeItem = typeItemStruct
      }
      typeItem.type = typeAlias[typeItem.type]
      if (typeItem.type === undefined) {
        throw new Error(`typejson: type must between ["${Object.keys(typeAlias).join('","')}"], can not be a ${typeItem.type}`)
      }
      let requried = sourceAttr[sourceAttr.length-1] !== '?'
      let isUndefinedValue: boolean = (value === undefined)
      if (requried && isUndefinedValue) {
        throw new Error(`typejson: attr: "${attr}" is requried and must be a ${typeItem.type}`)
      }
      let hasDefault = typeItem.default !== undefined
      if (requried && hasDefault) {
        console.warn(`typejson: attr: "${attr}" requried attr can not have default, maybe you should remove default or add "attr?"`)
      }
      let shouldSetDefaultValue = !requried && hasDefault
      let shouldSetEmptyValue: boolean
      ;(function () {
        shouldSetEmptyValue = Boolean(!requried && isUndefinedValue)
        if (shouldSetDefaultValue) {
          shouldSetEmptyValue = false
        }
      })()
      if (shouldSetEmptyValue) {
        let emptyValueMap: any = {
          "string": "",
          "boolean": false,
          "number": null,
          "array": [],
          "object": {}
        }
        value = emptyValueMap[typeItem.type]
      }
      if (shouldSetDefaultValue) {
        value = typeItem.default
      }
      //  try transform value
      if (typeItem.type === "number" && vartype === "string") {
        let transValue = Number(value)
        if (isNaN(transValue)) {
          throw new Error(`typejson: ${JSON.stringify(target)} attr is not a number`)
        }
        value = transValue
        vartype = gettype(value)
      }
      if (requried && typeItem.type !== vartype) {
        throw new Error(`typejson: ${sourceAttr}(${vartype}) is not a ${typeItem.type}`)
      }
      if (typeItem.regexp && !new RegExp(typeItem.regexp).test(value)) {
        throw new Error(`typejson: regexp: ${typeItem.regexp} can not match ${value}`)
      }
      eval(`output.${attrList.join('.')} = value`)
    })
    return output
  }
}

export default TypeJSON
export { TypeJSON }
exports = TypeJSON
