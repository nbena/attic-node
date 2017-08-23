"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../postgres");
const types_1 = require("./useful/types");
const utils_1 = require("./useful/utils");
class NoteMiddle {
    static addTags(note, tags, roles) {
        return new Promise((resolve, reject) => {
            db.notes.addTags(note, tags, roles)
                .then(result => {
                console.log(result);
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static changeDone(note, done) {
        return new Promise((resolve, reject) => {
            db.notes.changeDone(note, done)
                .then(result => {
                resolve(new types_1.BasicResult(true, JSON.stringify(result)));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static changeLinks(note, links) {
        return new Promise((resolve, reject) => {
            db.notes.changeLinks(note, links)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static changeText(note, text) {
        return new Promise((resolve, reject) => {
            db.notes.changeText(note, text)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static changeTitle(note, title) {
        return new Promise((resolve, reject) => {
            db.notes.changeTitle(note, title)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static createNote(note) {
        return new Promise((resolve, reject) => {
            let result;
            result = db.notes.createNote(note);
            result.then(result => {
                let noteRes = result[0].result;
                resolve(new types_1.NoteResult(true, noteRes));
            });
            result.catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static removeNote(note) {
        return new Promise((resolve, reject) => {
            db.notes.removeNote(note)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static removeTagsFromNote(note, tags) {
        return new Promise((resolve, reject) => {
            db.notes.removeTagsFromNote(note, tags)
                .then(result => {
                resolve(new types_1.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesMinByTagsAnd(user, tags, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDateByTagsAnd(user, tags);
            }
            else {
                p = db.notes.selectNotesMinByTagsAnd(user, tags);
            }
            p.then(result => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, result, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesMinByTagsOr(user, tags, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDateByTagsOr(user, tags);
            }
            else {
                p = db.notes.selectNotesMinByTagsOr(user, tags);
            }
            p.then(result => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, result, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNoteByTitle(note) {
        return new Promise((resolve, reject) => {
            db.notes.selectNoteByTitle(note)
                .then(note => {
                resolve(new types_1.NoteResult(true, note));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTitleReg(user, title, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDateByTitleReg(user, title);
            }
            else {
                p = db.notes.selectNotesMinByTitleReg(user, title);
            }
            p.then(notes => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTextReg(user, text, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDateByTextReg(user, text);
            }
            else {
                p = db.notes.selectNotesMinByTextReg(user, text);
            }
            p.then(notes => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesMin(user, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDate(user);
            }
            else {
                p = db.notes.selectNotesMin(user);
            }
            p.then(notes => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesMinByIsDone(user, isDone, withDate) {
        return new Promise((resolve, reject) => {
            let p;
            if (withDate) {
                p = db.notes.selectNotesMinWithDateByIsDone(user, isDone);
            }
            else {
                p = db.notes.selectNotesMinByIsDone(user, isDone);
            }
            p.then(notes => {
                resolve(types_1.NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
}
exports.default = NoteMiddle;
//# sourceMappingURL=note_middle.js.map