"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../middles/useful/utils");
class Endpoint404 {
    static error404(req, res, next) {
        res.status(404);
        res.json(utils_1.default.json404());
    }
}
exports.default = Endpoint404;
//# sourceMappingURL=404_endpoint.js.map