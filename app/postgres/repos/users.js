"use strict";
const sql_1 = require("../sql");
const user_1 = require("../../models/user");
let sql = sql_1.default.users;
class Repository {
    constructor(db, pgp) {
        this.createUser = (user) => {
            return this.db.one(sql.createUser, user.getValues(), (result) => {
                return result.user;
            });
        };
        this.removeUser = (user) => {
            return this.db.result(sql.removeUser, user.userId, (result) => { result.rowCount; });
        };
        this.selectByUserId = (userId) => {
            return this.db.oneOrNone(sql.selectByUserId, userId, (result) => {
                let user = new user_1.default(result.user.userId);
                user.hashedPassword = result.user.hashedPassword;
                return user;
            });
        };
        this.db = db;
        this.pgp = pgp;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=users.js.map