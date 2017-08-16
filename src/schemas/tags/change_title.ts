export const ChangeTitleSchema = {
  "tag": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength": 64,
        "minLength":1
      },
      "newtitle": {
        "type": "string",
        "maxLength": 64,
        "minLength":1
      }
    },
    "required": ["title", "newtitle"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/tag" }
  }, "required": ["tag"]
}
