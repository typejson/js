export interface IF_TypeJSON {
  parse(json: string) : any
}
export interface IF_TypeItem {
  default: any
  type: string
  label: string
}
export interface IF_Types {
  [attr: string]: IF_TypeItem
}
