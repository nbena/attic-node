"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
const user_1 = require("../../models/user");
let sql = sql_1.default.users;
class Repository {
    constructor(db, pgp) {
        this.createUser = (user) => {
            return this.db.one(sql.createUser, [user.userid, user.hashedpassword], (result) => {
                return result;
            });
        };
        this.removeUser = (user) => {
            return this.db.result(sql.removeUser, user.userid, (result) => { result.rowCount; });
        };
        this.selectByUserId = (userid) => {
            return this.db.oneOrNone(sql.selectByUserId, userid, (result) => {
                let user = new user_1.default(result.user.userid);
                user.hashedpassword = result.user.hashedpassword;
                return user;
            });
        };
        this.db = db;
        this.pgp = pgp;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=users.js.map