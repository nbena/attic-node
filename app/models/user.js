"use strict";
const bcrypt = require("bcrypt");
class User {
    hashPassword() {
        return bcrypt.genSalt(10)
            .then(salt => {
            return bcrypt.hash(this.hashedpassword, salt);
        })
            .then(hash => {
            this.hashedpassword = hash;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    checkPassword(passwordToCheck) {
        return bcrypt.compare(passwordToCheck, this.hashedpassword);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=user.js.map