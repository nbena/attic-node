"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    getValues() {
        return [this.userid, this.title];
    }
    constructor(title, userid) {
        if (title != null) {
            this.title = title;
        }
        if (userid != null) {
            this.userid = userid;
        }
    }
}
exports.default = Base;
//# sourceMappingURL=base.js.map