"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const auth_middle_1 = require("../middles/auth_middle");
const const_1 = require("../middles/useful/const");
const types = require("../middles/useful/types");
const utils_1 = require("../middles/useful/utils");
class AuthEndpoint {
}
AuthEndpoint.authenticate = (req, res, next) => {
    if (!req.user || req.user == null) {
        res.json(new types.BasicResult(false, const_1.default.ERR_USER));
    }
    auth_middle_1.default.authenticate(new user_1.default(req.user))
        .then(result => {
        res.json(result);
    })
        .catch(error => {
        res.json(utils_1.default.jsonErr(error));
    });
};
exports.default = AuthEndpoint;
//# sourceMappingURL=auth_endpoint.js.map