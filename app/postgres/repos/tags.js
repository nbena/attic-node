"use strict";
const sql_1 = require("../sql");
let sql = sql_1.default.tags;
class Repository {
    constructor(db, pgp) {
        this.changeTitle = (tag, newTitle) => {
            return this.db.one(sql.changeTitle, [tag.userId, tag.title, newTitle], (tag) => { return tag.result; });
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
            return this.db.any(sql.selectTagsByTitle, [user.userId, title]);
        };
        this.selectTagsFull = (user) => {
            return this.db.any(sql.selectTagsFull, [user.userId]);
        };
        this.selectTagsMin = (user) => {
            return this.db.any(sql.selectTagsMin, [user.userId]);
        };
        this.db = db;
        this.pgp = pgp;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=tags.js.map