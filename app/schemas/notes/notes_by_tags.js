"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesByTagsSchema = {
    "note": {
        "type": "object",
        "properties": {
            "tags": {
                "type": "array",
                "items": {
                    "type": "string",
                    "maxLength": 64
                },
                "minItems": 1,
                "maxItems": 13
            }
        },
        "required": ["tags"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=notes_by_tags.js.map