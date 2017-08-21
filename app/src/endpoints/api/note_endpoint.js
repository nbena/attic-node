"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../../models/note");
const TagClass = require("../../models/tag");
const utils_1 = require("../../middles/useful/utils");
const note_middle_1 = require("../../middles/note_middle");
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
        result = note_middle_1.default.addTags(note, tags, roles);
        result.then(result => {
            res.json(result);
        });
    }
    static selectNotesMin(req, res, next) {
        let user = utils_1.default.extractUser(req);
        note_middle_1.default.selectNotesMin(user, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDate(req, res, next) {
        let user = utils_1.default.extractUser(req);
        note_middle_1.default.selectNotesMin(user, true)
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
        tags = req.body.note.tags.map((currentValue) => {
            let t = new TagClass.Tag();
            t.title = currentValue;
            return t;
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
    static selectNotesMinByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title;
        title = req.body.note.title;
        note_middle_1.default.selectNotesByTitleReg(user.userid, title, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByTextReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let text;
        text = req.body.note.text;
        note_middle_1.default.selectNotesByTextReg(user.userid, text, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title;
        title = req.body.note.title;
        note_middle_1.default.selectNotesByTitleReg(user.userid, title, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTextReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let text;
        text = req.body.note.text;
        note_middle_1.default.selectNotesByTextReg(user.userid, text, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByIsDone(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let isDone = req.body.note.isdone;
        note_middle_1.default.selectNotesMinByIsDone(user, isDone, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByIsDone(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let isDone = req.body.note.isdone;
        note_middle_1.default.selectNotesMinByIsDone(user, isDone, false)
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