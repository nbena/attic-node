"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const secret_1 = require("../config/secret");
const types_1 = require("./useful/types");
class AuthMiddle {
    static getToken(headers) {
        let res;
        if (!headers.authorization) {
            return null;
        }
        res = headers.authorization.split(' ');
        if (res.length != 2) {
            return null;
        }
        return res[1];
    }
    static getUserFromToken(headers) {
        let token = AuthMiddle.getToken(headers);
        if (token == null) {
            throw new Error('NO TOKEN');
        }
        let userid = jwt.decode(token, secret_1.default.secret);
        return new user_1.default(userid);
    }
    static generateToken(user) {
        let obj = { userid: user.userid };
        return jwt.sign(obj, secret_1.default.secret, { expiresIn: '30d' });
    }
    static authenticate(user) {
        return new Promise((resolve, reject) => {
            let result = new types_1.AuthResult();
            result.ok = true;
            result.result = 'JWT ' + AuthMiddle.generateToken(user);
            resolve(result);
        });
    }
}
exports.default = AuthMiddle;
//# sourceMappingURL=auth_middle.js.map