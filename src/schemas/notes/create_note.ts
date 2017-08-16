export const CreateNoteSchema = {
  "note": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "maxLength": 64
      },
      "text": { "type": "string" },
      "isdone": { "type": "boolean" },
      "links": {
        "type": "array",
        "items": { "type": "string", "format": "uri" }
      },
      "lastmodificationdate": {
        "type": "string",
        "format": "date-time"
      },
      "creationdate": {
        "type": "string",
        "format": "date-time"
      },
      "maintags": {
        "type": "array",
        "items": {
          "items": "string",
          "maxLength": 64
        },
        "maxItems": 3,
        "minItems": 0
      },
      "othertags": {
        "type": "array",
        "items": {
          "items": "string",
          "maxLength": 64
        },
        "maxItems": 10,
        "minItems": 0
      }
    },
    "required": ["title", "text"]
  },


  "type": "object",
  "properties": {
    "note": { "$ref": "#/note" }
  }, "required": ["note"]
}
