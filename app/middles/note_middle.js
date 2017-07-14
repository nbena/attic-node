"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../postgres");
const types = require("./useful/types");
const utils_1 = require("./useful/utils");
const const_1 = require("./useful/const");
class NoteMiddle {
}
NoteMiddle.addTags = (note, tags, roles) => {
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
};
NoteMiddle.changeLinks = (note, links) => {
    return new Promise((resolve, reject) => {
        db.notes.changeLinks(note, links)
            .then(result => {
            resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.changeText = (note, text) => {
    return new Promise((resolve, reject) => {
        db.notes.changeText(note, text)
            .then(result => {
            resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.changeTitle = (note, title) => {
    return new Promise((resolve, reject) => {
        db.notes.changeTitle(note, title)
            .then(result => {
            resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.createNote = (note) => {
    return new Promise((resolve, reject) => {
        let result;
        result = db.notes.createNote(note);
        result.then(result => {
            console.log('the result');
            console.log(JSON.stringify(result));
            let noteRes = result[0].result;
            noteRes.maintags = ((note.maintags == null) ? [] : note.maintags);
            noteRes.othertags = ((note.othertags == null) ? [] : note.othertags);
            resolve(new types.NoteResult(true, noteRes));
        });
        result.catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.removeNote = (note) => {
    return new Promise((resolve, reject) => {
        db.notes.removeNote(note)
            .then(result => {
            resolve(new types.Result(true));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.removeTagsFromNote = (note, tags) => {
    return new Promise((resolve, reject) => {
        db.notes.removeTagsFromNote(note, tags)
            .then(result => {
            resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectNotesByTagsNoRole = (userId, tags, and) => {
    return new Promise((resolve, reject) => {
        db.notes.selectNotesByTagsNoRole(userId, tags, and)
            .then(rawResult => {
            resolve(new types.AnyResult(true, rawResult));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectNotesByTagsWithRole = (userId, tags, roles, and) => {
    return new Promise((resolve, reject) => {
        if (tags.length != roles.length) {
            resolve(utils_1.default.jsonErr(new TypeError(const_1.default.ERR_DIFF_LENGTH)));
        }
        db.notes.selectNotesByTagsWithRole(userId, tags, roles, and)
            .then(rawResult => {
            resolve(new types.AnyResult(true, rawResult));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectNoteByTitle = (note) => {
    return new Promise((resolve, reject) => {
        db.notes.selectNoteByTitle(note)
            .then(note => {
            resolve(new types.NoteResult(true, note));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectNotesByTitleReg = (userId, title) => {
    return new Promise((resolve, reject) => {
        db.notes.selectNotesByTitleReg(userId, title)
            .then(notes => {
            resolve(new types.AnyResult(true, notes));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectNotesByTextReg = (userId, text) => {
    return new Promise((resolve, reject) => {
        db.notes.selectNotesByTextReg(userId, text)
            .then(notes => {
            resolve(new types.AnyResult(true, notes));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.selectAllNotesMin = (user) => {
    return new Promise((resolve, reject) => {
        db.notes.selectNotesMin(user)
            .then(notes => {
            resolve(new types.AnyResult(true, notes));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
NoteMiddle.setDone = (note, done) => {
    return new Promise((resolve, reject) => {
        db.notes.setDone(note, done)
            .then(result => {
            resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
            .catch(error => {
            resolve(utils_1.default.jsonErr(error));
        });
    });
};
exports.default = NoteMiddle;
//# sourceMappingURL=note_middle.js.map