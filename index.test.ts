import { TypeJSON } from "./index"
import { IF_Types } from "./interface"
test('type.string empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "name": {
      type: "string"
    }
  }
  let output: Error = new Error(`typejson: attr: "name" is requried and must be a string`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output);
});
test('type.string? empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "name?": {
      type: "string"
    }
  }
  let output:any = {"name": ""}
  expect(tjson.parse(data, types)).toEqual(output);
});
test('type.bool? empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "hot?": {
      type: "bool"
    }
  }
  let output:any = {hot: false}
  expect(tjson.parse(data, types)).toEqual(output);
});
test('type.number string transform number', () => {
  let tjson = new TypeJSON()
  let data:any = {"age": "1"}
  let types: IF_Types = {
    "age": {
      type: "number"
    }
  }
  let output:any = {"age": 1}
  expect(tjson.parse(data, types)).toEqual(output);
});
test('type.number empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "age": {
      type: "number"
    }
  }
  let output:Error = new Error(`typejson: attr: "age" is requried and must be a number`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
});
test('type.array empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "list": {
      type: "array"
    }
  }
  let output:Error = new Error(`typejson: attr: "list" is requried and must be a array`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
});

test('type.array? empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "list?": {
      type: "array"
    }
  }
  let output: any = {list: []}
  expect(tjson.parse(data, types)).toEqual(output)
});
test('type.object empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "map": {
      type: "object"
    }
  }
  let output:Error = new Error(`typejson: attr: "map" is requried and must be a object`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
});

test('type.object? empty value', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "map?": {
      type: "object"
    }
  }
  let output: any = {map: {}}
  expect(tjson.parse(data, types)).toEqual(output)
});

test('string.default', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "status?": {
      type: "string",
      default: "normal"
    }
  }
  let output: any = {status: "normal"}
  expect(tjson.parse(data, types)).toEqual(output)
})

test('number.default', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "page?": {
      type: "number",
      default: 1
    }
  }
  let output: any = {page: 1}
  expect(tjson.parse(data, types)).toEqual(output)
})

test('bool.default', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "opened?": {
      type: "bool",
      default: true
    }
  }
  let output: any = {opened: true}
  expect(tjson.parse(data, types)).toEqual(output)
})

test('array.default', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "list?": {
      type: "array",
      default: ["some"]
    }
  }
  let output: any = {list: ["some"]}
  expect(tjson.parse(data, types)).toEqual(output)
})

test('object.default', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "map?": {
      type: "object",
      default: {
        name: "nimo"
      }
    }
  }
  let output: any = {
    map: {
      name: "nimo"
    }
  }
  expect(tjson.parse(data, types)).toEqual(output)
})
