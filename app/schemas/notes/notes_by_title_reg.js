"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesByTitleRegSchema = {
    "note": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "maxLength": 64,
                "minLength": 1
            }
        },
        "required": ["title"]
    },
    "type": "object",
    "properties": {
        "note": { "$ref": "#/note" }
    }, "required": ["note"]
};
//# sourceMappingURL=notes_by_title_reg.js.map