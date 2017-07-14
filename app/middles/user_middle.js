"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middle_1 = require("./auth_middle");
const db = require("../postgres");
const utils_1 = require("./useful/utils");
class UserMiddle {
}
UserMiddle.createUser = (user) => {
    return new Promise((resolve, reject) => {
        user.hashPassword();
        db.users.createUser(user)
            .then(createdUser => {
            let result = {
                ok: true,
                token: 'JWT ' + auth_middle_1.default.generateToken(user)
            };
            resolve(result);
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
UserMiddle.removeUser = (user) => {
    return new Promise((resolve, reject) => {
        db.users.removeUser(user)
            .then(result => {
            resolve(result);
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
exports.default = UserMiddle;
//# sourceMappingURL=user_middle.js.map