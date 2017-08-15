"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const user_1 = require("../../models/user");
const const_1 = require("./const");
class Utils {
    static extractUser(req) {
        return new user_1.default(req.user.userid);
    }
}
Utils.jsonErr = (err) => {
    console.error(err.stack);
    console.log(JSON.stringify(err));
    if (err.name == 'BatchError' || const_1.PostgresError.isPostgresError(err.message)) {
        err = new types_1.DbError(err.message);
    }
    let msg = const_1.PostgresError.getCorrectError(err.message);
    let res = new types_1.BasicResult(false, err.name + ' ' + msg);
    return res;
};
Utils.jsonCorrect = (obj) => {
    let objString = JSON.stringify(obj, (key, value) => {
        if (key == 'userid') {
            key = 'userId';
        }
    });
    let objRes = JSON.parse(objString);
    return objRes;
};
exports.default = Utils;
//# sourceMappingURL=utils.js.map