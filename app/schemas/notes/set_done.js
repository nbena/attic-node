"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDoneSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "maxLength": 64
            },
            "isdone": { "type": "boolean" }
        },
        "required": ["title", "isodne"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=set_done.js.map