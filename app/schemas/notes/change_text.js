"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTextSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "maxLength": 64
            },
            "text": { "type": "string" },
        },
        "required": ["title", "text"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=change_text.js.map