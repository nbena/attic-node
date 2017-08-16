export const NotesByTextSchema = {
  "note": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "minLength":1
      }
    },
    "required": ["text"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
