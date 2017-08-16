"use strict";
const AJV = require("ajv");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const index_1 = require("../index");
const login_1 = require("./login");
let ajv = new AJV();
ajv.addSchema(login_1.LoginSchema, index_1.Schemas.Auth.LOGIN_SCHEMA);
function valid(schema) {
    return (req, res, next) => {
        let valid = ajv.validate(schema, req.body);
        if (valid) {
            return next();
        }
        else {
            res.json(utils_1.default.jsonErr(new types_1.JsonError(ajv.errorsText())));
        }
    };
}
module.exports = valid;
//# sourceMappingURL=index.js.map