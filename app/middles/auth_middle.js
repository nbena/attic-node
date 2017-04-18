"use strict";
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const database_1 = require("../config/database");
const UsefulTypes = require("./useful/types");
class AuthMiddle {
}
AuthMiddle.getToken = (headers) => {
    let res;
    if (!headers.authorization) {
        return null;
    }
    res = headers.authorization.split(' ');
    if (res.length != 2) {
        return null;
    }
    return res[1];
};
AuthMiddle.getUserFromToken = (headers) => {
    let token = AuthMiddle.getToken(headers);
    if (token == null) {
        throw new Error('NO TOKEN');
    }
    let userId = jwt.decode(token, database_1.default.secret);
    return new user_1.default(userId);
};
AuthMiddle.generateToken = (user) => {
    return jwt.sign({ userId: user.userId }, database_1.default.secret);
};
AuthMiddle.authenticate = (user) => {
    return new Promise((resolve, reject) => {
        let result = new UsefulTypes.AuthResult();
        result.ok = true;
        result.result = 'JWT ' + AuthMiddle.generateToken(user);
        resolve(result);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthMiddle;
//# sourceMappingURL=auth_middle.js.map