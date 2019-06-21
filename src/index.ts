const gettype = require("typeof")
const extend = require("safe-extend")
import { IF_TypeJSON, IF_Types } from "./interface"
import { createOrGet, createOrSet } from "./CRUD"

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
  parse(target: any, types: IF_Types ={}): any {
    const self = this
    target = extend.clone(target)
    let output:any = {}
    Object.keys(target).forEach(function (key) {
      if (key[0] === '|') {
        types[key.slice(1, key.length)] = target[key]
        delete target[key]
      }
    })
    Object.keys(types).forEach((sourceAttr, index) => {
      let typeItem: any = types[sourceAttr]
      let requried = sourceAttr[sourceAttr.length-1] !== '?'
      let path = sourceAttr.replace(/\?$/, '')
      let attrList = path.split(".")
      let leafNodeAttr: string = attrList[attrList.length-1]
      let arraySymbolIndex = path.indexOf('*')
      if (arraySymbolIndex !== -1) {
        // prefixObjectPath = 'list.*' => 'list'
        let prefixObjectPath: string = path.slice(0, arraySymbolIndex).replace(/\.$/, '')
        // suffixArrayPath = 'list.*' => ''
        //                        'list.*.title' => 'title'
        let suffixArrayPath: string = path.slice(arraySymbolIndex+1, path.length).replace(/^\./, '')
        let prefixObjectAttrList: string[] = prefixObjectPath.split('.')
        let suffixArrayAttrList: string[] = suffixArrayPath.split('.')
        let prefixArray:any = createOrGet(target, prefixObjectAttrList, [])
        prefixArray = prefixArray.map(function (item: any) {
          // if sourceAttr = "list.*" suffixArrayPath is ""
          if (suffixArrayPath === "") {
            let subParseTempName = `${prefixObjectPath.replace(/\./g, '(DOT)')}(ARRAY_ITEM)`
            return self.parse(
              {
                [subParseTempName]: item
              },
              {
                [subParseTempName]: typeItem
              }
            )[subParseTempName]
          }
          else {
            let subParseTempName = `${prefixObjectPath.replace(/\./g, '(DOT)')}(ARRAY_ITEM)`
            return self.parse({
              [subParseTempName]: item
            },
            {
              [subParseTempName + '.' + suffixArrayPath + (requried?'':'?')]: typeItem
            })[subParseTempName]
          }
        })
        createOrSet(output, prefixObjectAttrList, extend(true, createOrGet(output, prefixObjectAttrList, []), prefixArray))
        return
      }
      // set safe value
      let value: any = createOrGet(target, attrList)
      let vartype: string = gettype(value)
      if (typeof typeItem === "string") {
        let typeItemStruct:any = {
          type: '',
          note: '',
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
      let isUndefinedValue: boolean = (value === undefined)
      if (requried && isUndefinedValue) {
        throw new Error(`typejson: attr: "${leafNodeAttr}" is requried and must be a ${typeItem.type}`)
      }
      let hasDefault = typeItem.default !== undefined
      if (requried && hasDefault) {
        console.warn(`typejson: attr: "${leafNodeAttr}" requried attr can not have default, maybe you should remove default or add "attr?"`)
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
      if (typeItem.type === "boolean" && vartype === "number") {
        if (value !== 1 && value !== 0) {
          throw new Error(`typejson: ${path} can not be ${JSON.stringify(value)}, must be a bool or "1" "0" 1 0`)
        }
        value = Boolean(value)
      }
      if (typeItem.type === "boolean" && vartype === "string") {
        if (value !== "1" && value !== "0") {
          throw new Error(`typejson: ${path} can not be ${JSON.stringify(value)}, must be a bool or "1" "0" 1 0`)
        }
        value = Boolean(Number(value))
      }
      //  try transform value
      if (typeItem.type === "number" && vartype === "string") {
        let transValue = Number(value)
        if (isNaN(transValue)) {
          throw new Error(`typejson: ${JSON.stringify(target)} attr is not a number`)
        }
        value = transValue
      }
      // 更新类型
      vartype = gettype(value)
      if (requried && typeItem.type !== vartype) {
        throw new Error(`typejson: ${sourceAttr}(${vartype}) is not a ${typeItem.type}`)
      }
      if (typeItem.regexp && !new RegExp(typeItem.regexp).test(value)) {
        throw new Error(`typejson: regexp: ${typeItem.regexp} can not match ${value}`)
      }
      createOrSet(output, attrList, value)
    })
    return output
  }
}

export default TypeJSON
export { TypeJSON }
exports = TypeJSON
