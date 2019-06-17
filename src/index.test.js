const TypeJSON = require("./index").default


test('basic parse', () => {
  let tjson = new TypeJSON()
  let types = {
    "name": {
      type: "string"
    }
  }
  expect(tjson.parse(`{}`, types)).toEqual({"name": ""});
});
