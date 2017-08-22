"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tag {
    getValues() {
        return [this.userid, this.title];
    }
    constructor(title, userid) {
        if (title != null) {
            this.title = title;
        }
        if (userid != null) {
            this.userid = userid;
        }
        this.noteslength = 0;
    }
}
exports.Tag = Tag;
class TagMin extends Tag {
}
exports.TagMin = TagMin;
class TagFull extends Tag {
}
exports.TagFull = TagFull;
class Tag2 extends Tag {
}
exports.Tag2 = Tag2;
//# sourceMappingURL=tag.js.map