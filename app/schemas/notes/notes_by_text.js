"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesByTextSchema = {
    "note": {
        "type": "object",
        "properties": {
            "text": {
                "type": "string"
            }
        },
        "required": ["text"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=notes_by_text.js.map