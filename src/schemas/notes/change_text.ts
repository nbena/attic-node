export const ChangeTextSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength": 64
      },
      "text": {
        "type": "string",
        "minLength": 2
      },
    },
    "required": ["title", "text"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
