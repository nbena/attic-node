export const NotesByTagsWithRoleSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength":64
      },
      "maintags":{
        "type":"array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        "minItems":1
      },
      "othertags":{
        "type":"array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        "minItems":1
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
