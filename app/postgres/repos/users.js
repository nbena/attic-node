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
            return this.db.result(sql.removeUser, user.userid, (result) => { result.rowCount; });
        };
        this.selectByUserId = (userid) => {
            return this.db.oneOrNone(sql.selectByUserId, userid, (result) => {
                console.log('the result of the select is:');
                console.log(JSON.stringify(result));
                let user = new user_1.default(result.user.userid);
                user.hashedpassword = result.user.hashedpassword;
                console.log('the user instead is:');
                console.log(JSON.stringify(user));
                return user;
            });
        };
        this.db = db;
        this.pgp = pgp;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=users.js.map