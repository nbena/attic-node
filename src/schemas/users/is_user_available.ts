export const IsUserAvailableSchema = {
  "type": "object",
  "required": ["userid"],
  "properties": {
    "userid": {
      "type": "string",
      "maxLength": 64
    }
  }
}
