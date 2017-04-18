"use strict";
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
//# sourceMappingURL=types.js.map