import { IF_TypeJSON, IF_Types } from "./interface"

const log = console.log

class TypeJSON implements IF_TypeJSON{
  parse(target: any, types: IF_Types): any {
    let output:any = {}
    Object.keys(types).map((attr, index) => {
      let typesSourceAttr: string = attr
      attr = attr.replace(/\?$/, '')
      let attrList = attr.split(".")
      attr = attrList[attrList.length-1]
      let requried = typesSourceAttr[typesSourceAttr.length-1] !== '?'

      let value: any = target[attr]
      const vartype: string = gettype(value)
      let typeItem: any = types[typesSourceAttr]
      if (typeof typeItem === "string") {
        typeItem = {
          type: typeItem
        }
      }
      let isUndefinedValue: boolean = typeof target[attr] === "undefined"
      if (requried && isUndefinedValue) {
        throw new Error(`typejson: attr: "${attr}" is requried and must be a ${typeItem.type}`)
      }
      let hasDefault = typeItem.default !== undefined
      if (requried && hasDefault) {
        console.warn(`typejson: attr: "${attr}" requried attr can not have default, maybe you `)
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
          "bool": false,
          "number": null,
          "array": [],
          "object": {}
        }
        value = emptyValueMap[typeItem.type]
      }
      if (shouldSetDefaultValue) {
        value = typeItem.default
      }
      if (typeItem.type === "number" && vartype === "string") {
        let transValue = Number(value)
        if (isNaN(transValue)) {
          throw new Error(`typejson: ${JSON.stringify(target)} attr is not a number`)
        }
        value = transValue
      }
      output[attr] = value
    })
    return output
  }
}

function gettype (object: any): string {
  let type: string = typeof object;

  if (type === 'undefined') {
    return 'undefined';
  }
  if (object) {
    type = object.constructor.name;
  } else if (type === 'object') {
    type = Object.prototype.toString.call(object).slice(8, -1);
  }
  return type.toLowerCase();
}

export default TypeJSON
export { TypeJSON }
exports = TypeJSON
