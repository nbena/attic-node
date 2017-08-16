export const ChangeLinksSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength": 64
      },
      "links": {
        "type": "array",
        "items":{
          "type":"string",
          "format":"uri"
        }
      }
    },
    "required": ["title", "links"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
