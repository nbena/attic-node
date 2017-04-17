"use strict";
const bcrypt = require("bcrypt");
class User {
    hashPassword() {
        return bcrypt.genSalt(10)
            .then(salt => {
            return bcrypt.hash(this.hashedPassword, salt);
        })
            .then(hash => {
            this.hashedPassword = hash;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    checkPassword(passwordToCheck) {
        return bcrypt.compare(passwordToCheck, this.hashedPassword);
    }
    getValues() {
        let values = {
            userId: this.userId,
            hashedPassword: this.hashedPassword
        };
        return values;
    }
    constructor(userId) {
        this.userId = userId;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=user.js.map