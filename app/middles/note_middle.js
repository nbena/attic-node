"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../postgres");
const types = require("./useful/types");
const utils_1 = require("./useful/utils");
const const_1 = require("./useful/const");
class NoteMiddle {
    static addTags(note, tags, roles) {
        return new Promise((resolve, reject) => {
            db.notes.addTags(note, tags, roles)
                .then(result => {
                console.log(result);
                resolve(new types.Result(true));
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
                resolve(new types.Result(true));
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
                resolve(new types.Result(true));
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
                resolve(new types.Result(true));
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
                resolve(new types.NoteResult(true, noteRes));
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
                resolve(new types.Result(true));
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
                resolve(new types.Result(true));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTagsNoRole(userId, tags, and) {
        return new Promise((resolve, reject) => {
            db.notes.selectNotesByTagsNoRole(userId, tags, and)
                .then(rawResult => {
                resolve(new types.AnyResult(true, rawResult));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTagsWithRole(userId, tags, roles, and) {
        return new Promise((resolve, reject) => {
            if (tags.length != roles.length) {
                resolve(utils_1.default.jsonErr(new TypeError(const_1.Const.ERR_DIFF_LENGTH)));
            }
            db.notes.selectNotesByTagsWithRole(userId, tags, roles, and)
                .then(rawResult => {
                resolve(new types.AnyResult(true, rawResult));
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
                resolve(new types.NoteResult(true, note));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTitleReg(userId, title) {
        return new Promise((resolve, reject) => {
            db.notes.selectNotesByTitleReg(userId, title)
                .then(notes => {
                resolve(new types.AnyResult(true, notes));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectNotesByTextReg(userId, text) {
        return new Promise((resolve, reject) => {
            db.notes.selectNotesByTextReg(userId, text)
                .then(notes => {
                resolve(new types.AnyResult(true, notes));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectAllNotesMin(user) {
        return new Promise((resolve, reject) => {
            db.notes.selectNotesMin(user)
                .then(notes => {
                resolve(new types.AnyResult(true, notes));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static selectAllNotesMinWithDate(user) {
        return new Promise((resolve, reject) => {
            db.notes.selectNotesMinWithDate(user)
                .then(notes => {
                resolve(new types.AnyResult(true, notes));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
    static setDone(note, done) {
        return new Promise((resolve, reject) => {
            db.notes.setDone(note, done)
                .then(result => {
                resolve(new types.BasicResult(true, JSON.stringify(result)));
            })
                .catch(error => {
                resolve(utils_1.default.jsonErr(error));
            });
        });
    }
}
exports.default = NoteMiddle;
//# sourceMappingURL=note_middle.js.map