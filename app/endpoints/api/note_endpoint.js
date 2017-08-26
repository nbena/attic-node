"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../../models/note");
const tag_1 = require("../../models/tag");
const utils_1 = require("../../middles/useful/utils");
const note_middle_1 = require("../../middles/note_middle");
class NoteEndpoint {
    static addTags(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags = [];
        let roles = [];
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        if (req.body.note.maintags) {
            req.body.note.maintags.forEach(obj => {
                let tag = new tag_1.TagExtraMin(obj);
                tags.push(tag);
                roles.push('mainTags');
            });
        }
        if (req.body.note.othertags) {
            req.body.note.othertags.forEach(obj => {
                let tag = new tag_1.TagExtraMin(obj);
                tags.push(tag);
                roles.push('otherTags');
            });
        }
        note_middle_1.default.addTags(note, tags, roles)
            .then(result => {
            res.json(result);
        });
    }
    static changeDone(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let isDone = req.body.note.isdone;
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        note_middle_1.default.changeDone(note, isDone)
            .then(result => {
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
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        let links = req.body.note.links;
        note_middle_1.default.changeLinks(note, links)
            .then(result => {
            res.json(result);
        });
    }
    static changeText(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        let text = req.body.note.text;
        note_middle_1.default.changeText(note, text)
            .then(result => {
            res.json(result);
        });
    }
    static changeTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        let newTitle = req.body.note.newtitle;
        note_middle_1.default.changeTitle(note, newTitle)
            .then(result => {
            res.json(result);
        });
    }
    static createNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note;
        note = new note_1.Note();
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
        note.links = req.body.note.links;
        note.isdone = req.body.note.isdone;
        console.log(note);
        note_middle_1.default.createNote(note)
            .then(result => {
            res.json(result);
        });
    }
    static removeNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note = new note_1.NoteExtraMin(req.params.title, user.userid);
        note_middle_1.default.removeNote(note)
            .then(result => {
            res.json(result);
        });
    }
    static removeTagsFromNote(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note = new note_1.NoteExtraMin(req.body.title, user.userid);
        let tags = [];
        tags = req.body.note.tags.map(obj => { return new tag_1.TagExtraMin(obj); });
        note_middle_1.default.removeTagsFromNote(note, tags)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByTagsOr(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags = req.body.note.tags.map(obj => { return new tag_1.TagExtraMin(obj); });
        note_middle_1.default.selectNotesMinByTagsOr(user, tags, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByTagsAnd(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags = req.body.note.tags.map(obj => { return new tag_1.TagExtraMin(obj); });
        note_middle_1.default.selectNotesMinByTagsAnd(user, tags, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTagsOr(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags = req.body.note.tags.map(obj => { return new tag_1.TagExtraMin(obj); });
        note_middle_1.default.selectNotesMinByTagsOr(user, tags, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTagsAnd(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let tags = req.body.note.tags.map(obj => { return new tag_1.TagExtraMin(obj); });
        note_middle_1.default.selectNotesMinByTagsAnd(user, tags, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNoteByTitle(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let note = new note_1.NoteExtraMin(req.params.title, user.userid);
        note_middle_1.default.selectNoteByTitle(note)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title;
        title = req.body.note.title;
        note_middle_1.default.selectNotesByTitleReg(user, title, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinByTextReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let text;
        text = req.body.note.text;
        note_middle_1.default.selectNotesByTextReg(user, text, false)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTitleReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let title;
        title = req.body.note.title;
        note_middle_1.default.selectNotesByTitleReg(user, title, true)
            .then(result => {
            res.json(result);
        });
    }
    static selectNotesMinWithDateByTextReg(req, res, next) {
        let user = utils_1.default.extractUser(req);
        let text;
        text = req.body.note.text;
        note_middle_1.default.selectNotesByTextReg(user, text, true)
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
}
exports.default = NoteEndpoint;
//# sourceMappingURL=note_endpoint.js.map