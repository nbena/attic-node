export const ChangeTitleSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength": 64
      },
      "newtitle": {
        "type": "string",
        "minLength":1,
        "maxLength": 64
      }
    },
    "required": ["title", "newtitle"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
