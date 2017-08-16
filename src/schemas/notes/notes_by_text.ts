export const NotesByTextSchema = {
  "note": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string"
      }
    },
    "required": ["text"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
