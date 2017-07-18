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
class NoteResult extends Result {
    constructor(ok, note) {
        super(ok);
        this.result = note;
    }
}
exports.NoteResult = NoteResult;
class TagResult extends Result {
    constructor(ok, tag) {
        super(ok);
        this.result = tag;
    }
}
exports.TagResult = TagResult;
class TagMinResult extends Result {
    constructor(ok, tag) {
        super(ok);
        this.result = tag;
    }
}
exports.TagMinResult = TagMinResult;
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