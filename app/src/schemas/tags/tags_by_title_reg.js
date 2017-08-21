"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsByTitleRegSchema = {
    "tag": {
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
        "note": { "$ref": "#/tag" }
    }, "required": ["tag"]
};
//# sourceMappingURL=tags_by_title_reg.js.map