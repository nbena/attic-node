"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveTagsSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "maxLength": 64
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "string",
                    "maxLength": 64
                },
                "minLength": 1
            }
        },
        "required": ["title", "tags"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=remove_tags.js.map