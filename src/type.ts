export interface IF_TypeJSON {
  parse(target: any, types: IF_Types) : any
}
// export interface IF_TypeItem {
//   default?: any
//   type: string
//   label?: string
//   check?: IF_TypeItemCheck
// }
export interface IF_Types {
  [index: string]: any
}
export interface IF_ParseCallback {
  onCheckFail(message: string): void
}
