const log = console.log
function createAndReturnValue (data: any, attrList: string[]) {
  let parentValue: any = data
  let targetValue: any
  attrList.forEach(function (key: string, deep: number) {
    let isLastAttr = deep === attrList.length - 1
    if (isLastAttr) {
      targetValue = parentValue[key]
      return
    }
    parentValue[key] = parentValue[key] || {}
    parentValue = parentValue[key]
  })

  return [targetValue, parentValue]
}
function createOrGet (data: any, attrList: string[], defaultValue:any=undefined) {
  let [targetValue, parentValue] = createAndReturnValue(data, attrList)
  if (defaultValue !== undefined && targetValue === undefined) {
    let leafNodeAttr = attrList[attrList.length-1]
    parentValue[leafNodeAttr] = defaultValue
    return parentValue[leafNodeAttr]
  }
  return targetValue
}
function createOrSet (data: any, attrList: string[], value: any) {
  let [, parentValue] = createAndReturnValue(data, attrList)
  parentValue[attrList[attrList.length-1]] = value
}

export { createOrGet, createOrSet }
