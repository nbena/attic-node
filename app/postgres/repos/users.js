"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
const user_1 = require("../../models/user");
let sql = sql_1.default.users;
class Repository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    createUser(user) {
        return this.db.one(sql.createUser, [user.userid, user.hashedpassword], (result) => {
            return result;
        });
    }
    removeUser(user) {
        return this.db.result(sql.removeUser, user.userid, (result) => { result.rowCount; });
    }
    selectByUserId(userid) {
        return this.db.oneOrNone(sql.selectByUserId, userid, (result) => {
            console.log('the result of the select is:');
            console.log(JSON.stringify(result));
            let user = new user_1.default(result.user.userid);
            user.hashedpassword = result.user.hashedpassword;
            return user;
        });
    }
    summary(user) {
        return this.db.one(sql.selectSummary, [user.userid], (result) => {
            return result.get_user_summary;
        });
    }
    isUserAvailable(user) {
        return this.db.one(sql.isAvailable, [user.userid], (result) => {
            return result.isavailable;
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=users.js.map