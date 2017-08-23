"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../models/tag");
const db = require("../postgres");
const types_1 = require("./useful/types");
const utils_1 = require("./useful/utils");
class TagMiddle {
    static changeTitle(tag, newTitle) {
        return new Promise((resolve, reject) => {
            db.tags.changeTitle(tag, newTitle)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static createTag(tag) {
        return new Promise((resolve, reject) => {
            db.tags.createTag(tag)
                .then(result => {
                let res = new tag_1.TagAlmostMin(tag.title, tag.userid);
                res.noteslength = 0;
                resolve(new types_1.TagAlmostMinResult(true, res));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static removeTag(tag) {
        return new Promise((resolve, reject) => {
            db.tags.removeTag(tag)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectTagByTitle(tag) {
        return new Promise((resolve, reject) => {
            db.tags.selectTagByTitle(tag)
                .then(result => {
                resolve(new types_1.TagResult(true, result));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectTagsAlmostMinByTitleReg(user, title) {
        return new Promise((resolve, reject) => {
            db.tags.selectTagsAlmostMinByTitleReg(user, title)
                .then(tags => {
                resolve(new types_1.TagAlmostMinResult(true, tags));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectAllTagsAlmostMin(user) {
        return new Promise((resolve, reject) => {
            db.tags.selectTagsAlmostMin(user)
                .then(tags => {
                resolve(new types_1.TagAlmostMinResult(true, tags));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
}
exports.default = TagMiddle;
//# sourceMappingURL=tag_middle.js.map