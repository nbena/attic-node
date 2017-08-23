"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
let sql = sql_1.default.tags;
class Repository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    changeTitle(tag, newTitle) {
        return this.db.none(sql.changeTitle, [tag.userid, tag.title, newTitle]);
    }
    createTag(tag) {
        return this.db.one(sql.createTag, tag.getValues(), (tag) => { return tag.result; });
    }
    removeTag(tag) {
        return this.db.none(sql.removeTag, tag.getValues());
    }
    selectTagByTitle(tag) {
        return this.db.oneOrNone(sql.selectTagByTitle, tag.getValues(), (tag) => { return tag; });
    }
    selectTagsAlmostMinByTitleReg(user, title) {
        return this.db.any(sql.selectTagsByTitle, [user.userid, title]);
    }
    selectTagsAlmostMin(user) {
        return this.db.any(sql.selectTagsMin, [user.userid]);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=tags.js.map