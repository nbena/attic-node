"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesByTagsNoRoleSchema = {
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
                "minItems": 1
            }
        },
        "required": ["title", "tags"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=notes_by_tags_no_role.js.map