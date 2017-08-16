export const LoginSchema = {
  // "user": {
  //   "type": "object",
  //   "properties": {
  //     "userid": {
  //       "type": "string",
  //       "maxLength": 64
  //       //TODO add email pattern
  //     },
  //     "password": {
  //       "type": "string",
  //       "minLength": 8
  //     }
  //   },
  //   "required": ["userid", "password"]
  // },
  //
  //
  // "type": "object",
  // "properties": {
  //   "note": { "$ref": "#/user" }
  // }, "required": ["user"]
  "type":"object",
  "required":["userid", "password"],
  "properties":{
    "userid":{
      "type":"string",
      "maxLength":64
    },
    "password":{
      "type":"string",
      "minLength":8
    }
  }
}
