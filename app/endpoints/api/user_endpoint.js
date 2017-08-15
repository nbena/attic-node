"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const user_middle_1 = require("../../middles/user_middle");
class UserEndpointParamCheck {
    static createUser(req) {
        let result = null;
        if (!req.body.userid || !req.body.password) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.USERNAME_AND_PASSWORD));
        }
        return result;
    }
    static summary(req) {
        let result = null;
        if (!req.params.userid) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.USERID_REQUIRED));
        }
        return result;
    }
    static isUserAvailable(req) {
        let result = null;
        if (!req.body.userid) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.USERID_REQUIRED));
        }
        return result;
    }
}
class UserEndpoint {
    static isUserAvailable(req, res, next) {
        let user;
        let check = UserEndpointParamCheck.isUserAvailable(req);
        if (check != null) {
            res.json(check);
            return;
        }
        user = new user_1.default(req.body.userid);
        user_middle_1.default.isUserAvailable(user)
            .then(result => {
            res.json(result);
        });
    }
}
UserEndpoint.createUser = (req, res, next) => {
    let user;
    let check = UserEndpointParamCheck.createUser(req);
    if (check != null) {
        res.json(check);
        return;
    }
    user = new user_1.default(req.body.userid);
    user.hashedpassword = req.body.password;
    user_middle_1.default.createUser(user)
        .then(result => {
        res.json(result);
    });
};
UserEndpoint.summary = (req, res, next) => {
    let user;
    let check = UserEndpointParamCheck.summary(req);
    if (check != null) {
        res.json(check);
        return;
    }
    user = utils_1.default.extractUser(req);
    if (user.userid != req.params.userid) {
        res.json(utils_1.default.jsonErr(new Error(const_1.Const.USER_MISMATCH)));
        return;
    }
    user_middle_1.default.summary(user)
        .then(result => {
        res.json(result);
    });
};
exports.default = UserEndpoint;
//# sourceMappingURL=user_endpoint.js.map