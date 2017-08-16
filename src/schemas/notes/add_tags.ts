export const AddTagsSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength":64
      },
      "maings": {
        "type": "array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        "minLength":1
      },
      "othertags":{
        "type": "array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        "minLength":1
      }
    },
    "required": ["title"],
    "anyOf":[
      {"required":["maintags"]},
      {"required":["othertags"]}
    ]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
