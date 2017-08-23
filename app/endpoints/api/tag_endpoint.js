"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../../models/tag");
const utils_1 = require("../../middles/useful/utils");
const tag_middle_1 = require("../../middles/tag_middle");
class TagEndpoint {
    static changeTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tag = new tag_1.TagExtraMin(req.body.tag.title, user.userid);
        let newTitle;
        newTitle = req.body.tag.newtitle;
        tag_middle_1.default.changeTitle(tag, newTitle)
            .then(result => {
            res.json(result);
        });
    }
    static createTag(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tag = new tag_1.TagExtraMin(req.params.title, user.userid);
        tag_middle_1.default.createTag(tag)
            .then(result => {
            res.json(result);
        });
    }
    static removeTag(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tag = new tag_1.TagExtraMin(req.params.title, user.userid);
        tag_middle_1.default.removeTag(tag)
            .then(result => {
            res.json(result);
        });
    }
    static selectTagByTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tag = new tag_1.TagExtraMin(req.params.title, user.userid);
        tag_middle_1.default.selectTagByTitle(tag)
            .then(result => {
            res.json(result);
        });
    }
    static selectTagsAlmostMinByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title = '%' + req.body.tag.title + '%';
        tag_middle_1.default.selectTagsAlmostMinByTitleReg(user, title)
            .then(result => {
            res.json(result);
        });
    }
    static selectAllTagsAlmostMin(req, res, next) {
        let user = utils_1.default.extractUser(req);
        tag_middle_1.default.selectAllTagsAlmostMin(user)
            .then(result => {
            res.json(result);
        });
    }
}
exports.default = TagEndpoint;
//# sourceMappingURL=tag_endpoint.js.map