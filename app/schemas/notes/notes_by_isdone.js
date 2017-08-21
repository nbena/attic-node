"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesByIsDoneSchema = {
    "note": {
        "type": "object",
        "properties": {
            "isdone": {
                "type": "boolean"
            }
        },
        "required": ["isdone"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=notes_by_isdone.js.map