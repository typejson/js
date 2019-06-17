import { IF_TypeJSON, IF_Types, IF_TypeItem } from "./interface"
const log = console.log

class TypeJSON {
  parse(json: string, types: IF_Types) {
    var target = JSON.parse(json)
    let output:any = {}
    Object.keys(types).map((attr, index) => {
      let typesItem: IF_TypeItem = types[attr]
      let isUndefinedValue: boolean = typeof target[attr] === "undefined"
      if (isUndefinedValue) {
        switch(typesItem.type) {
          case "string":
            output[attr] = ""
          break
        }
      }
    })
    return output
  }
}
export default TypeJSON
