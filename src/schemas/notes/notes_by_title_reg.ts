export const NotesByTitleRegSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength":64
      }
    },
    "required": ["title"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
