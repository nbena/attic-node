"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "minLength": 1,
                "maxLength": 64
            },
            "text": { "type": "string", "minLength": 2 },
            "isdone": { "type": "boolean", "default": false },
            "links": {
                "type": "array",
                "items": { "type": "string", "format": "uri" },
                "default": []
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
                "minItems": 0,
                "default": []
            },
            "othertags": {
                "type": "array",
                "items": {
                    "items": "string",
                    "maxLength": 64
                },
                "maxItems": 10,
                "minItems": 0,
                "default": []
            }
        },
        "required": ["title", "text"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=create_note.js.map