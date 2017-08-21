"use strict";
const AJV = require("ajv");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const index_1 = require("../index");
const is_user_available_1 = require("./is_user_available");
let ajv = new AJV();
ajv.addSchema(is_user_available_1.IsUserAvailableSchema, index_1.Schemas.Users.IS_USER_VALID_SCHEMA);
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