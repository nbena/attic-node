export const NotesByIsDoneSchema = {
  "note": {
    "type": "object",
    "properties": {
      "isdone": {
        "type": "boolean"
      }
    },
    "required": ["isdone"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
