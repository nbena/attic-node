export const TagsByTitleRegSchema = {
  "tag": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength":64,
        "minLength":1
      }
    },
    "required": ["title"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/tag" }
  }, "required": ["tag"]
}
