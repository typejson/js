import { TypeJSON } from "./index"
import { IF_Types } from "./interface"

let tjson = new TypeJSON()
test('type.string empty value', () => {

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

  let data: any = {}
  let types: IF_Types = {
    "hot?": {
      type: "bool"
    }
  }
  let output:any = {hot: false}
  expect(tjson.parse(data, types)).toEqual(output);
});

test('type.number 1 transform bool', () => {

  let data:any = {hot: 1}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:any = {hot: true}
  expect(tjson.parse(data, types)).toEqual(output);
});
test('type.number 0 transform bool', () => {

  let data:any = {hot: 0}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:any = {hot: false}
  expect(tjson.parse(data, types)).toEqual(output);
});

test('type.number 2 transform bool throw errror', () => {

  let data:any = {hot: 2}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:Error = new Error(`typejson: hot can not be 2, must be a bool or "1" "0" 1 0`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
});
test('type.string "1" transform bool', () => {

  let data:any = {hot: "1"}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:any = {hot: true}
  expect(tjson.parse(data, types)).toEqual(output);
})
test('type.string "0" transform bool', () => {

  let data:any = {hot: "0"}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:any = {hot: false}
  expect(tjson.parse(data, types)).toEqual(output);
});

test('type.string "2" transform bool throw errror', () => {

  let data:any = {hot: "2"}
  let types: IF_Types = {
    "hot": {
      type: "bool"
    }
  }
  let output:Error = new Error(`typejson: hot can not be "2", must be a bool or "1" "0" 1 0`)
  expect(function () {
    tjson.parse(data, types)
  }).toThrow(output)
})
test('type.number string transform number', () => {

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



test('data have types', () => {

  let data: any = {
    "|name?": {
      type: "string"
    }
  }
  let types: IF_Types = {}
  let output:any = {"name": ""}
  expect(tjson.parse(data, types)).toEqual(output);
});
test('omit types', () => {

  let data: any = {
    "|name?": {
      type: "string"
    }
  }
  let types: IF_Types = {}
  let output:any = {"name": ""}
  expect(tjson.parse(data)).toEqual(output);
})

test('regexp', () => {

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

test('emptyObject.emptyObject.defaultValue?', () => {
  expect(
    tjson.parse({
      '|form.project.title?': {
        type: 'string',
        default: 'some',
      }
    })
  ).toEqual(
    {
      form: {
        project: {
          title: "some"
        }
      }
    }
  )
})


test('object.*? string', () => {
  expect(
    tjson.parse({
      list: [
        'abc'
      ],
      '|list.*?': 'string'
    })
  ).toEqual(
    {"list": ['abc']}
  )
})

test('object.*? string throw error', () => {
  expect(function () {
      tjson.parse({
        list: [
          123
        ],
        '|list.*?': 'string'
      })
  }).toThrow(
    new Error('typejson: list(ARRAY_ITEM)(number) is not a string')
  )
})

test('deep level array', () => {

  let data: any = {
    some: [
      {}
    ]
  }
  let types: IF_Types = {
    "some?": "array",
    "some.*?": "object",
    "some.*.title?": "string",
  }
  let output: any = {
    some: [
      {
        title: ''
      }
    ]
  }
  expect(tjson.parse(data, types)).toEqual(output)
})


test('deep level array list', () => {

  let data: any = {
    list: [
      {
        title: "1 some",
        author: {
          name: "nimo",
          age: 27
        }
      },
      {
        title: "2 some",
        hot: true,
        author: {
          name: "nico",
          age: 18
        }
      }
    ]
  }
  let types: IF_Types = {
    "list": "array",
    "list.*": "object",
    "list.*.title": "string",
    "list.*.hot?": "bool",
    "list.*.author": "object",
    "list.*.author.name": "string",
    "list.*.author.age": "number",
  }
  let output: any =  {
    list:[
      { title: '1 some', hot: false,  author: {name: 'nimo', age: 27} },
      { title: '2 some', hot: true,   author: {name: 'nico', age: 18} }
    ]
  }
  expect(tjson.parse(data, types)).toEqual(output)
})

test('form.itemList.*?', () => {

  let data: any = {
  form: {
    id: "",
    itemList: [
      {
        project_id: '',
        is_billing: 1,
        billing_date: '',
        invoice_path: {
          id: '',
          src: ''
        },
        is_receipt: 0,
        receipt_date: '',
        receipt_proof_path: {
          id: '',
          src: ''
        },
        is_settlement: 1,
        settlement_path: {
          id: '',
          src: ''
        },
        settlement_date: '',
      }
    ],
    remark: ''
  },
  '|form': 'object',
  '|form.id': 'uuid',
  '|form.itemList': 'array',
  '|form.itemList.*?': 'object',
  '|form.itemList.*.project_id?': 'uuid',

  '|form.itemList.*.is_billing': 'bool',
  '|form.itemList.*.billing_date': 'date',
  '|form.itemList.*.invoice_path': 'object',
  '|form.itemList.*.invoice_path.id': 'uuid',
  '|form.itemList.*.invoice_path.src': 'url',


  '|form.itemList.*.is_receipt': 'bool',
  '|form.itemList.*.receipt_date': 'date',
  '|form.itemList.*.receipt_proof_path': 'object',
  '|form.itemList.*.receipt_proof_path.id': 'uuid',
  '|form.itemList.*.receipt_proof_path.src': 'url',

  '|form.itemList.*.is_settlement': 'bool',
  '|form.itemList.*.settlement_date': 'date',
  '|form.itemList.*.settlement_path': 'object',
  '|form.itemList.*.settlement_path.id': 'uuid',
  '|form.itemList.*.settlement_path.src': 'url',
  '|form.remark': 'string',

  options: {
    project: [

    ],
  },
  '|options': "object",
  '|options.project': 'array',
  '|options.project.*': 'object',
  '|options.project.*.label': 'string| 广告标题',
  '|options.project.*.value': 'string| 广告id',
}
  let output: any = {
    "form": {
      "id": "",
      "itemList": [
        {
          "project_id": "",
          "is_billing": true,
          "billing_date": "",
          "invoice_path": {
            "id": "",
            "src": ""
          },
          "is_receipt": false,
          "receipt_date": "",
          "receipt_proof_path": {
            "id": "",
            "src": ""
          },
          "is_settlement": true,
          "settlement_path": {
            "id": "",
            "src": ""
          },
          "settlement_date": ""
        }
      ],
      "remark": ""
    },
    "options": {
      "project": []
    }
  }
  expect(tjson.parse(data)).toEqual(output)
})
