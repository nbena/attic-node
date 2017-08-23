"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const user_middle_1 = require("../../middles/user_middle");
class UserEndpoint {
    static createUser(req, res, next) {
        let user;
        user = new user_1.default(req.body.user.userid);
        user.hashedpassword = req.body.user.password;
        user_middle_1.default.createUser(user)
            .then(result => {
            res.json(result);
        });
    }
    static summary(req, res, next) {
        let user;
        user = utils_1.default.extractUser(req);
        if (user.userid != req.params.userid) {
            res.json(utils_1.default.jsonErr(new Error(const_1.Const.USER_MISMATCH)));
            return;
        }
        user_middle_1.default.summary(user)
            .then(result => {
            res.json(result);
        });
    }
    static isUserAvailable(req, res, next) {
        let user;
        user = new user_1.default(req.body.userid);
        user_middle_1.default.isUserAvailable(user)
            .then(result => {
            res.json(result);
        });
    }
}
exports.default = UserEndpoint;
//# sourceMappingURL=user_endpoint.js.map