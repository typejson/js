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
test('type.number string transform number throw error', () => {
  let tjson = new TypeJSON()
  let data:any = {"age": "1e"}
  let types: IF_Types = {
    "age": {
      type: "number"
    }
  }
  let output:Error = new Error(`typejson: {\"age\":\"1e\"} attr is not a number`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
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

test('required and default warning', () => {
  let tjson = new TypeJSON()
  let data: any = {
    name: "nimo"
  }
  let types: IF_Types = {
    "name": {
      type: "string",
      default: "nico"
    }
  }
  let _warn = console.warn
  console.warn = function (message: any) {
    expect(message).toEqual('typejson: attr: \"name\" requried attr can not have default, maybe you should remove default or add \"attr?\"')
  }
  tjson.parse(data, types)

})

test('deep level', () => {
  let tjson = new TypeJSON()
  let data: any = {}
  let types: IF_Types = {
    "person?": {
      type: "object"
    },
    'person.children?': {
      type: "object"
    },
    'person.children.son?':{
      type: "string",
      default: "fifteen"
    }
  }
  let output: any = {
    "person": {
      "children": {
        "son": "fifteen",
      },
    }
  }
  expect(tjson.parse(data, types)).toEqual(output)
})

test('type|note', () => {
  let tjson = new TypeJSON()
  let data: any = {
    some: "a",
    foo: 1
  }
  let types: IF_Types = {
    "some": "string | 解释",
    "foo": "number|解释2"
  }
  let output: any = {
    some: "a",
    foo: 1
  }
  expect(tjson.parse(data, types)).toEqual(output)
})

test('error type', () => {
  let tjson = new TypeJSON()
  let data: any = {
    list: "abc"
  }
  let types: IF_Types = {
    "list": "array"
  }
  let output:Error = new Error(`typejson: list(string) is not a array`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
})

test('type alias', () => {
  let tjson = new TypeJSON()
  let data: any = {

  }
  let types: IF_Types = {
    "date?": "date",
    "url?": "url",
    "uri?": "uri",
    "uuid?": "uuid",
    "num?": "num",
    "boolean?": "boolean",
  }
  let output: any = {
    "date": "",
    "url": "",
    "uri": "",
    "uuid": "",
    "num": null,
    "boolean": false,
  }
  expect(tjson.parse(data, types)).toEqual(output)
})


test('not find type', () => {
  let tjson = new TypeJSON()
  let data: any = {

  }
  let types: IF_Types = {
    "id?": "nobody"
  }
  let output:Error = new Error(`typejson: type must between ["string","number","num","object","array","uuid","date","url","uri","bool","boolean"], can not be a undefined`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
})


test('deep level array', () => {
  let tjson = new TypeJSON()
  let data: any = {

  }
  let types: IF_Types = {
    "some?": "array",
    "some.*?": "object",
    "some.*.abc": "string",
  }
  let output: any = {
    some: []
  }
  expect(tjson.parse(data, types)).toEqual(output)
})


test('data have types', () => {
  let tjson = new TypeJSON()
  let data: any = {
    "|name?": {
      type: "string"
    }
  }
  let types: IF_Types = {}
  let output:any = {"name": ""}
  expect(tjson.parse(data, types)).toEqual(output);
});

test('regexp', () => {
  let tjson = new TypeJSON()
  let data: any = {
    name: "nimo"
  }
  let types: IF_Types = {
    name: {
      type: "string",
      regexp: "nimo"
    }
  }
  let output: any = {
    name: "nimo"
  }
  expect(tjson.parse(data, types)).toEqual(output)

  let outputError:Error = new Error(`typejson: regexp: nimo can not match free`)
  expect(function () {
    tjson.parse({name: "free"}, types)
  }).toThrow(outputError)

})
