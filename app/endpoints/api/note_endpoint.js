"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../../models/note");
const TagClass = require("../../models/tag");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const note_middle_1 = require("../../middles/note_middle");
class NoteEndpointParamCheck {
    static title(req) {
        let result = null;
        if (!req.body.note.title || !req.body.note) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.NOTE_REQUIRED));
        }
        return result;
    }
    static addTags(req) {
        let result = null;
        result = NoteEndpointParamCheck.title(req);
        if (req.body.note.maintags == null && req.body.note.othertags == null) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_REQUIRED));
        }
        else if (req.body.note.maintags != null) {
            if (req.body.note.maintags instanceof Array == false) {
                result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.NO_ARR_INST));
            }
        }
        if (req.body.note.othertags != null) {
            if (req.body.note.othertags instanceof Array == false) {
                result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.NO_ARR_INST));
            }
        }
        return result;
    }
    static changeLinks(req) {
        let result = null;
        result = NoteEndpointParamCheck.title(req);
        if (!req.body.note.links || req.body.note.links instanceof Array) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.LINKS_REQUIRED));
        }
        return result;
    }
    static changeText(req) {
        let result = null;
        result = NoteEndpointParamCheck.title(req);
        if (!req.body.note.text) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TEXT_REQUIRED));
        }
        return result;
    }
    static changeTitle(req) {
        let result = null;
        result = NoteEndpointParamCheck.title(req);
        if (!req.body.note.newtitle) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TITLE_REQUIRED));
        }
        return result;
    }
    static createNote(req) {
        let result = NoteEndpointParamCheck.changeText(req);
        if (req.body.note.maintags) {
            if (req.body.note.maintags instanceof Array == false) {
                result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.INVALID_NOTE));
            }
        }
        if (req.body.note.otherTags) {
            if (req.body.note.otherTags instanceof Array == false) {
                result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.INVALID_NOTE));
            }
        }
        if (req.body.note.links) {
            if (req.body.note.links instanceof Array == false) {
                result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.LINK_NOT_ARRAY));
            }
        }
        return result;
    }
    static removeNote(req) {
        let result = null;
        if (!req.params.title) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TITLE_REQUIRED));
        }
        return result;
    }
    static removeTagsFromNote(req) {
        let result = null;
        result = NoteEndpointParamCheck.title(req);
        if (!req.body.note.tags && req.body.note.tags instanceof Array) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_REQUIRED));
        }
        return result;
    }
    static selectNotesByTagsNoRole(req) {
        let result = null;
        if (req.body.tags == null) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.GEN_TAGS_REQUIRED));
        }
        else if (req.body.tags instanceof Array == false) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_NOT_ARRAY));
        }
        return result;
    }
    static selectNoteByTitle(req) {
        return NoteEndpointParamCheck.removeNote(req);
    }
    static selectNotesByTextReg(req) {
        let result = null;
        if (req.body.text == null) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TEXT_BASIC_REQUIRED));
        }
        return result;
    }
    static selectNotesByTitleReg(req) {
        let result = null;
        if (req.body.title == null) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TITLE_BASIC_REQUIRED));
        }
        return result;
    }
    static selectNotesByTagsWithRole(req) {
        let result = null;
        if (req.body.maintags == null || req.body.othertags == null) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_REQUIRED));
        }
        if (req.body.maintags && req.body.maintags instanceof Array) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_NOT_ARRAY));
        }
        if (req.body.othertags && req.body.othertags instanceof Array) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.TAGS_NOT_ARRAY));
        }
        return result;
    }
    static setDone(req) {
        let result = NoteEndpointParamCheck.title(req);
        if (!req.body.note.isdone) {
            result = utils_1.default.jsonErr(new types_1.JsonError(const_1.Const.IS_DONE_REQUIRED));
        }
        return result;
    }
}
class NoteEndpoint {
    static addTags(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags;
        let tagsTemp;
        let roles;
        let result;
        let note;
        note = new note_1.default();
        tags = [];
        roles = [];
        note.title = req.body.note.title;
        note.userid = user.userid;
        if (req.body.note.maintags) {
            req.body.note.maintags.map((currentValue, currentIndex) => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                tags.push(tag);
                roles.push('mainTags');
            });
        }
        if (req.body.note.othertags) {
            req.body.note.othertags.forEach(currentValue => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                tags.push(tag);
                roles.push('otherTags');
            });
        }
        console.log('the tags');
        console.log(JSON.stringify(tags));
        result = note_middle_1.default.addTags(note, tags, roles);
        result.then(result => {
            res.json(result);
        });
    }
    static selectAllNotesMin(req, res, next) {
        let user = utils_1.default.extractUser(req);
        note_middle_1.default.selectAllNotesMin(user)
            .then(result => {
            res.json(result);
        });
    }
    static selectAllNotesMinWithDate(req, res, next) {
        let user = utils_1.default.extractUser(req);
        note_middle_1.default.selectAllNotesMinWithDate(user)
            .then(result => {
            res.json(result);
        });
    }
    static changeLinks(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        let links;
        note = new note_1.default();
        note.title = req.body.note.title;
        links = req.body.note.links;
        note.userid = user.userid;
        note_middle_1.default.changeLinks(note, links)
            .then(result => {
            res.json(result);
        });
    }
    static changeText(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        let text;
        note = new note_1.default();
        note.title = req.body.note.title;
        text = req.body.note.text;
        note.userid = user.userid;
        note_middle_1.default.changeText(note, text)
            .then(result => {
            res.json(result);
        });
    }
    static changeTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        let newTitle;
        note = new note_1.default();
        note.title = req.body.note.title;
        newTitle = req.body.note.newtitle;
        note.userid = user.userid;
        note_middle_1.default.changeTitle(note, newTitle)
            .then(result => {
            res.json(result);
        });
    }
    static createNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        note = new note_1.default();
        note.userid = user.userid;
        note.title = req.body.note.title;
        note.text = req.body.note.text;
        note.maintags = req.body.note.maintags;
        note.othertags = req.body.note.othertags;
        if (req.body.note.lastmodificationdate) {
            note.lastmodificationdate = new Date(req.body.note.lastmodificationdate);
        }
        else {
            note.lastmodificationdate = new Date();
        }
        if (req.body.note.creationdate) {
            note.creationdate = new Date(req.body.note.creationdate);
        }
        else {
            note.creationdate = new Date();
        }
        console.log(note);
        note_middle_1.default.createNote(note)
            .then(result => {
            res.json(result);
        });
    }
    static removeNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        note = new note_1.default();
        note.userid = user.userid;
        note.title = req.params.title;
        note_middle_1.default.removeNote(note)
            .then(result => {
            res.json(result);
        });
    }
    static removeTagsFromNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        let tags = [];
        note = new note_1.default();
        note.title = req.body.note.title;
        note.userid = user.userid;
        req.body.note.tags.map((currentValue) => {
            let t = new TagClass.Tag();
            t.title = currentValue;
            tags.push(t);
        });
        note_middle_1.default.removeTagsFromNote(note, tags)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesByTagsNoRoleAnd(req, res, next) {
        return NoteEndpoint.selectNotesByTagsNoRoleCore(req, res, next, true);
    }
    static selectNotesByTagsWithRoleAnd(req, res, next) {
        return NoteEndpoint.selectNotesByTagsWithRoleCore(req, res, next, true);
    }
    static selectNotesByTagsNoRoleOr(req, res, next) {
        return NoteEndpoint.selectNotesByTagsNoRoleCore(req, res, next, false);
    }
    static selectNotesByTagsWithRoleOr(req, res, next) {
        return NoteEndpoint.selectNotesByTagsWithRoleCore(req, res, next, false);
    }
    static selectNotesByTagsNoRoleCore(req, res, next, and) {
        let user = utils_1.default.extractUser(req);
        let tags = [];
        req.body.tags.map((currentValue) => {
            let t = new TagClass.Tag();
            t.title = currentValue;
            tags.push(t);
        });
        note_middle_1.default.selectNotesByTagsNoRole(user.userid, tags, and)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesByTagsWithRoleCore(req, res, next, and) {
        let user = utils_1.default.extractUser(req);
        let tags = [];
        let roles = [];
        if (req.body.note.maintags) {
            req.body.mainTags.map((currentValue, currentIndex) => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                tags.push(tag);
                roles.push('maintags');
            });
        }
        if (req.body.note.othertags) {
            req.body.otherTags.map((currentValue, currentIndex) => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                tags.push(tag);
                roles.push('othertags');
            });
        }
        note_middle_1.default.selectNotesByTagsWithRole(user.userid, tags, roles, and)
            .then(result => {
            res.json(result);
        });
    }
    static selectNoteByTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        note = new note_1.default();
        note.title = req.params.title;
        note.userid = user.userid;
        note_middle_1.default.selectNoteByTitle(note)
            .then(result => {
            res.json(result);
        });
    }
    static selectNoteByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title;
        title = req.body.note.title;
        note_middle_1.default.selectNotesByTitleReg(user.userid, title)
            .then(result => {
            res.json(result);
        });
    }
    static selectNoteByTextReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let text;
        text = req.body.note.text;
        note_middle_1.default.selectNotesByTextReg(user.userid, text)
            .then(result => {
            res.json(result);
        });
    }
    static setDone(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let isDone;
        let note;
        note = new note_1.default();
        note.userid = user.userid;
        note.title = req.body.note.title;
        isDone = req.body.note.isdone;
        note_middle_1.default.setDone(note, isDone)
            .then(result => {
            res.json(result);
        });
    }
}
exports.default = NoteEndpoint;
//# sourceMappingURL=note_endpoint.js.map