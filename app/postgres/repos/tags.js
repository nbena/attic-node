"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
let sql = sql_1.default.tags;
class Repository {
    constructor(db, pgp) {
        this.changeTitle = (tag, newTitle) => {
            return this.db.any(sql.changeTitle, [tag.userid, tag.title, newTitle]);
        };
        this.createTag = (tag) => {
            return this.db.one(sql.createTag, tag.getValues(), (tag) => { return tag.result; });
        };
        this.removeTag = (tag) => {
            return this.db.none(sql.removeTag, tag.getValues());
        };
        this.selectTagByTitle = (tag) => {
            return this.db.oneOrNone(sql.selectTagByTitle, tag.getValues(), (tag) => { return tag; });
        };
        this.selectTagsByTitleReg = (user, title) => {
            return this.db.any(sql.selectTagsByTitle, [user.userid, title]);
        };
        this.selectTagsFull = (user) => {
            return this.db.any(sql.selectTagsFull, [user.userid]);
        };
        this.selectTagsMin = (user) => {
            return this.db.any(sql.selectTagsMin, [user.userid]);
        };
        this.db = db;
        this.pgp = pgp;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=tags.js.map