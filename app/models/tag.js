"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class TagExtraMin extends base_1.default {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.TagExtraMin = TagExtraMin;
class TagAlmostMin extends TagExtraMin {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.TagAlmostMin = TagAlmostMin;
class Tag extends TagAlmostMin {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map