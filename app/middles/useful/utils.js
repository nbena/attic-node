"use strict";
const Types = require("./types");
const user_1 = require("../../models/user");
class Utils {
}
Utils.jsonErr = (err) => {
    console.error(err.stack);
    console.log(JSON.stringify(err));
    let res = new Types.BasicResult(false, err.name + ' ' + err.message);
    return res;
};
Utils.extractUser = (req) => {
    return new user_1.default(req.user.userid);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
//# sourceMappingURL=utils.js.map