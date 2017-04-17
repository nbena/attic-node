"use strict";
const auth_middle_1 = require("./auth_middle");
const db = require("../postgres");
const utils_1 = require("./useful/utils");
class UserMiddle {
}
UserMiddle.createUser = (user) => {
    return new Promise((resolve, reject) => {
        db.users.createUser(user)
            .then(user => {
            let result = {
                ok: true,
                userId: user.userId,
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserMiddle;
//# sourceMappingURL=user_middle.js.map