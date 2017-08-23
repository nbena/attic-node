"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthResult {
}
exports.AuthResult = AuthResult;
class Result {
    constructor(ok) {
        this.ok = ok;
    }
    static fromAnyToResult(result) {
        let newResult = new Result(result.ok);
        return newResult;
    }
}
exports.Result = Result;
class BasicResult extends Result {
    constructor(ok, msg) {
        super(ok);
        this.msg = msg;
    }
}
exports.BasicResult = BasicResult;
class NoteExtraMinResult extends Result {
    constructor(ok, note) {
        super(ok);
        this.result = note;
    }
}
exports.NoteExtraMinResult = NoteExtraMinResult;
class NoteExtraMinWithDateResult extends Result {
    constructor(ok, note) {
        super(ok);
        this.result = note;
    }
    static getAppropriateNoteResult(ok, note, withDate) {
        let res;
        if (withDate) {
            res = new NoteExtraMinWithDateResult(ok, note);
        }
        else {
            res = new NoteExtraMinResult(ok, note);
        }
        return res;
    }
}
exports.NoteExtraMinWithDateResult = NoteExtraMinWithDateResult;
class NoteResult extends Result {
    constructor(ok, note) {
        super(ok);
        this.result = note;
    }
}
exports.NoteResult = NoteResult;
class TagExtraMinResult extends Result {
    constructor(ok, tag) {
        super(ok);
        this.result = tag;
    }
}
exports.TagExtraMinResult = TagExtraMinResult;
class TagAlmostMinResult extends Result {
    constructor(ok, tag) {
        super(ok);
        this.result = tag;
    }
}
exports.TagAlmostMinResult = TagAlmostMinResult;
class TagResult extends Result {
    constructor(ok, tag) {
        super(ok);
        this.result = tag;
    }
}
exports.TagResult = TagResult;
class AnyResult extends Result {
    constructor(ok, result) {
        super(ok);
        this.result = result;
    }
}
exports.AnyResult = AnyResult;
class JsonError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'JsonError';
    }
}
exports.JsonError = JsonError;
class DbError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'DbError';
    }
}
exports.DbError = DbError;
//# sourceMappingURL=types.js.map