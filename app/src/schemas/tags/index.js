"use strict";
const AJV = require("ajv");
const change_title_1 = require("./change_title");
const tags_by_title_reg_1 = require("./tags_by_title_reg");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const index_1 = require("../index");
let ajv = new AJV();
ajv.addSchema(change_title_1.ChangeTitleSchema, index_1.Schemas.Tags.CHANGE_TITLE_SCHEMA);
ajv.addSchema(tags_by_title_reg_1.TagsByTitleRegSchema, index_1.Schemas.Tags.TAGS_BY_TITLE_REG_SCHEMA);
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