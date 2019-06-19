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
export { gettype }
