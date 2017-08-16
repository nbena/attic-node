"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTitleSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "maxLength": 64
            },
            "newtitle": {
                "type": "string",
                "minLength": 1,
                "maxLength": 64
            }
        },
        "required": ["title", "newtitle"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=change_title.js.map