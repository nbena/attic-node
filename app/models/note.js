"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class NoteExtraMin extends base_1.default {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.NoteExtraMin = NoteExtraMin;
class NoteExtraMinWithDate extends NoteExtraMin {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.NoteExtraMinWithDate = NoteExtraMinWithDate;
class Note extends NoteExtraMinWithDate {
    constructor(title, userid) {
        super(title, userid);
    }
}
exports.Note = Note;
//# sourceMappingURL=note.js.map