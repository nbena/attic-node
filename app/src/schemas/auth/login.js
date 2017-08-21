"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = {
    "type": "object",
    "required": ["userid", "password"],
    "properties": {
        "userid": {
            "type": "string",
            "maxLength": 64
        },
        "password": {
            "type": "string",
            "minLength": 8
        }
    }
};
//# sourceMappingURL=login.js.map