export const NotesByTagsNoRoleSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength":64
      },
      "tags":{
        "type":"array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        //"maxItems":13,
        "minItems":1
      }
    },
    "required": ["title", "tags"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
