export const NotesByTagsSchema = {
  "note": {
    "type": "object",
    "properties": {
      "tags": {
        "type": "array",
        "items":{
          "type":"string",
          "maxLength":64
        },
        "minItems":1,
        "maxItems":13 //cause a not can't have more than 13 tags.
      }
    },
    "required": ["tags"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
