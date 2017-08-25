"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middle_1 = require("./auth_middle");
const db = require("../postgres");
const utils_1 = require("./useful/utils");
const types_1 = require("./useful/types");
class UserMiddle {
    static createUser(user) {
        return new Promise((resolve, reject) => {
            user.hashPassword();
            db.users.createUser(user)
                .then(createdUser => {
                let result = {
                    ok: true,
                    result: 'JWT ' + auth_middle_1.default.generateToken(user)
                };
                resolve(result);
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static removeUser(user) {
        return new Promise((resolve, reject) => {
            db.users.removeUser(user)
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static summary(user) {
        return new Promise((resolve, reject) => {
            db.users.summary(user)
                .then(result => {
                resolve(new types_1.AnyResult(true, result));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static isUserAvailable(user) {
        return new Promise((resolve, reject) => {
            db.users.isUserAvailable(user)
                .then(result => {
                resolve(new types_1.AnyResult(true, result));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
}
exports.default = UserMiddle;
//# sourceMappingURL=user_middle.js.map