"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha3_1 = require("js-sha3");
class User {
    hashPassword() {
        this.hashedpassword = js_sha3_1.sha3_512(this.hashedpassword);
    }
    checkPassword(passwordToCheck) {
        return new Promise((resolve, reject) => {
            let tempPassword = js_sha3_1.sha3_512(passwordToCheck);
            if (tempPassword == this.hashedpassword) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    getValues() {
        let values = {
            userid: this.userid,
            hashedpassword: this.hashedpassword
        };
        return values;
    }
    constructor(userid) {
        this.userid = userid;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map