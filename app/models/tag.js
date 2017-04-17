"use strict";
class Tag {
    getValues() {
        let values = [];
        values.push(this.userId);
        values.push(this.title);
        console.log('the values:');
        console.log(values);
        return values;
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