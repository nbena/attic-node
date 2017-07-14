"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const user_middle_1 = require("../../middles/user_middle");
class UserEndpointParamCheck {
}
UserEndpointParamCheck.createUser = (req) => {
    let result = null;
    if (!req.body.userid || !req.body.password) {
        result = utils_1.default.jsonErr(new Error(const_1.default.USERNAME_AND_PASSWORD));
    }
    return result;
};
class UserEndpoint {
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
exports.default = UserEndpoint;
//# sourceMappingURL=user_endpoint.js.map