function createAndReturnValue (data: any, attrList: string[]) {
  let parentValue: any = data
  let targetValue: any
  attrList.forEach(function (key: string, deep: number) {
    let isLastAttr = deep === attrList.length - 1
    if (isLastAttr) {
      targetValue = parentValue[key]
      return
    }
    parentValue = parentValue[key] || {}
  })
  return [targetValue, parentValue]
}
function createOrGet (data: any, attrList: string[]) {
  let [targetValue, _] = createAndReturnValue(data, attrList)
  return targetValue
}
function createOrSet (data: any, attrList: string[], value: any) {
  let [_, parentValue] = createAndReturnValue(data, attrList)
  parentValue[attrList[attrList.length-1]] = value
}

export { createOrGet, createOrSet }
