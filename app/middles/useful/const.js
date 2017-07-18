"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Const {
}
Const.ERR_USER = 'error: user is required';
Const.ERR_DIFF_LENGTH = 'the two arrays must have the same length';
Const.ERR_DB = 'db error';
Const.TAGS_REQUIRED = 'maintags or othertags are required';
Const.NO_ARR_INST = 'param must be instanceof array';
Const.INVALID_NOTE = 'the provided param is not a valid note';
Const.NOTE_REQUIRED = 'note.title required';
Const.LINKS_REQUIRED = 'note.links required';
Const.LINK_NOT_ARRAY = 'note.links is not an array';
Const.IS_DONE_NOT_BOOL = 'note.isdone is not boolean';
Const.TEXT_REQUIRED = 'note.text required';
Const.TEXT_BASIC_REQUIRED = 'text required';
Const.TITLE_REQUIRED = 'note.title required, or :title required';
Const.TITLE_BASIC_REQUIRED = 'title required';
Const.IS_DONE_REQUIRED = 'note.isdone required';
Const.NOTE_NEW_TITLE_REQUIRED = 'note.newtitle required';
Const.NOTE_NEW_TEXT_REUIRED = 'note.newtext required';
Const.TAG_TITLE_REQUIRED = 'tag.title required';
Const.TAG_TITLE_PARAM_REQUIRED = ':title required';
Const.TAG_NEW_TITLE_REQUIRED = 'tag.newTitle required';
Const.GEN_TAGS_REQUIRED = 'tags:[ ... ] required';
Const.TAGS_NOT_ARRAY = 'maintags or othetags must be instanceof array';
Const.USERNAME_AND_PASSWORD = 'userid and password required';
Const.USERID_REQUIRED = ':userid required';
Const.USER_MISMATCH = 'the authenticated user is different from the required one';
exports.default = Const;
class PostgresError {
}
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES = "duplicate key value violates unique constraint \"notes_pkey\"";
PostgresError.POSTGRES_DUPLICATE_KEY_TAGS = "error duplicate key value violates unique constraint \"tags_pkey\"";
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS = "error duplicate key value violates unique constraint \"notes_tags_pkey\"";
exports.PostgresError = PostgresError;
//# sourceMappingURL=const.js.map