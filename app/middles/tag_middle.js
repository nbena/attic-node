"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../postgres");
const types = require("./useful/types");
const utils_1 = require("./useful/utils");
class TagMiddle {
}
TagMiddle.changeTitle = (tag, newTitle) => {
    return new Promise((resolve, reject) => {
        db.tags.changeTitle(tag, newTitle)
            .then(result => {
            resolve(new types.Result(true));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
TagMiddle.createTag = (tag) => {
    return new Promise((resolve, reject) => {
        db.tags.createTag(tag)
            .then(result => {
            tag.noteslength = 0;
            resolve(new types.TagResult(true, tag));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
TagMiddle.removeTag = (tag) => {
    return new Promise((resolve, reject) => {
        db.tags.removeTag(tag)
            .then(result => {
            resolve(new types.Result(true));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
TagMiddle.selectTagByTitle = (tag) => {
    return new Promise((resolve, reject) => {
        db.tags.selectTagByTitle(tag)
            .then(result => {
            resolve(new types.TagMinResult(true, result));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
TagMiddle.selectTagsByTitleReg = (user, title) => {
    return new Promise((resolve, reject) => {
        db.tags.selectTagsByTitleReg(user, title)
            .then(tags => {
            resolve(new types.AnyResult(true, tags));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
TagMiddle.selectAllTagsMin = (user) => {
    return new Promise((resolve, reject) => {
        db.tags.selectTagsMin(user)
            .then(tags => {
            resolve(new types.AnyResult(true, tags));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
exports.default = TagMiddle;
//# sourceMappingURL=tag_middle.js.map