"use strict";
const TagClass = require("../../models/tag");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const tag_middle_1 = require("../../middles/tag_middle");
class TagEndpointParamCheck {
}
TagEndpointParamCheck.title = (req) => {
    let result = null;
    if (!req.body.tag.title || !req.body.tag) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TAG_TITLE_REQUIRED));
    }
    return result;
};
TagEndpointParamCheck.changeTitle = (req) => {
    let result = TagEndpointParamCheck.title(req);
    if (!req.body.tag.newtitle) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TAG_NEW_TITLE_REQUIRED));
    }
    return result;
};
TagEndpointParamCheck.createTag = (req) => {
    let result = null;
    if (!req.params.title) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TAG_TITLE_PARAM_REQUIRED));
    }
    return result;
};
TagEndpointParamCheck.removeTag = (req) => {
    return TagEndpointParamCheck.createTag(req);
};
TagEndpointParamCheck.selectTagByTitle = (req) => {
    return TagEndpointParamCheck.createTag(req);
};
TagEndpointParamCheck.selectTagsByTitleReg = (req) => {
    return TagEndpointParamCheck.title(req);
};
class TagEndpoint {
}
TagEndpoint.changeTitle = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tag;
    let newTitle;
    let result = TagEndpointParamCheck.changeTitle(req);
    if (result != null) {
        res.json(result);
        return;
    }
    tag = new TagClass.Tag();
    tag.title = req.body.tag.title;
    tag.userid = user.userid;
    newTitle = req.body.tag.newTitle;
    tag_middle_1.default.changeTitle(tag, newTitle)
        .then(result => {
        res.json(result);
    });
};
TagEndpoint.createTag = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tag;
    let result = TagEndpointParamCheck.createTag(req);
    if (result != null) {
        res.json(result);
        return;
    }
    tag = new TagClass.Tag();
    tag.title = req.params.title;
    tag.userid = user.userid;
    tag_middle_1.default.createTag(tag)
        .then(result => {
        res.json(result);
    });
};
TagEndpoint.removeTag = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tag;
    let result = TagEndpointParamCheck.removeTag(req);
    if (result != null) {
        res.json(result);
        return;
    }
    tag = new TagClass.Tag();
    tag.title = req.params.title;
    tag.userid = user.userid;
    tag_middle_1.default.removeTag(tag)
        .then(result => {
        res.json(result);
    });
};
TagEndpoint.selectTagByTitle = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tag;
    let result = TagEndpointParamCheck.selectTagByTitle(req);
    if (result != null) {
        res.json(result);
        return;
    }
    tag = new TagClass.Tag();
    tag.title = req.params.title;
    tag.userid = user.userid;
    console.log('the object is:'),
        console.log(JSON.stringify(tag));
    tag_middle_1.default.selectTagByTitle(tag)
        .then(result => {
        res.json(result);
    });
};
TagEndpoint.selectTagsByTitleReg = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let result = TagEndpointParamCheck.selectTagsByTitleReg(req);
    if (result != null) {
        res.json(result);
        return;
    }
    ;
    let title = '%' + req.body.tag.title + '%';
    tag_middle_1.default.selectTagsByTitleReg(user, title)
        .then(result => {
        res.json(result);
    });
};
TagEndpoint.selectAllTagsMin = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    tag_middle_1.default.selectAllTagsMin(user)
        .then(result => {
        res.json(result);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagEndpoint;
//# sourceMappingURL=tag_endpoint.js.map