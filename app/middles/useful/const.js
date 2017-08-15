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
Const.USERID_REQUIRED = ':userid required (or in the body too)';
Const.USER_MISMATCH = 'the authenticated user is different from the required one';
exports.Const = Const;
class PostgresError {
    static getCorrectError(error) {
        let returnedError = error;
        switch (error) {
            case PostgresError.POSTGRES_DUPLICATE_KEY_NOTES:
                returnedError = PostgresError.FINAL_DUPLICATE_KEY_NOTES;
                break;
            case PostgresError.POSTGRES_DUPLICATE_KEY_TAGS:
                returnedError = PostgresError.FINAL_DUPLICATE_KEY_TAGS;
                break;
            case PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS:
                returnedError = PostgresError.FINAL_DUPLICATE_KEY_NOTES_TAGS;
                break;
            case PostgresError.POSTGRES_USER_REACHED_MAX_NOTES:
                returnedError = PostgresError.FINAL_USER_REACHED_MAX_NOTES;
                break;
            case PostgresError.POSTGRES_USER_REACHED_MAX_TAGS:
                returnedError = PostgresError.FINAL_USER_REACHED_MAX_TAGS;
                break;
            case PostgresError.POSTGRES_MAINTAGS_LIMIT:
                returnedError = PostgresError.FINAL_MAINTAGS_LIMIT;
                break;
            case PostgresError.POSTGRES_OTHERTAGS_LIMIT:
                returnedError = PostgresError.FINAL_OTHERTAGS_LIMIT;
                break;
            case PostgresError.POSTGRES_MAINTAGS_LIMIT:
                returnedError = PostgresError.FINAL_MAINTAGS_LIMIT;
                break;
            case PostgresError.POSTGRES_TAGS_FKEY:
                returnedError = PostgresError.FINAL_TAGS_FKEY;
                break;
        }
        return returnedError;
    }
    static isPostgresError(msg) {
        return (msg == PostgresError.POSTGRES_DUPLICATE_KEY_NOTES || msg == PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS
            || msg == PostgresError.POSTGRES_DUPLICATE_KEY_TAGS || msg == PostgresError.POSTGRES_MAINTAGS_LIMIT
            || msg == PostgresError.POSTGRES_OTHERTAGS_LIMIT || msg == PostgresError.POSTGRES_TAGS_FKEY
            || msg == PostgresError.POSTGRES_USER_REACHED_MAX_NOTES || msg == PostgresError.POSTGRES_USER_REACHED_MAX_TAGS);
    }
}
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES = 'duplicate key value violates unique constraint \"notes_pkey\"';
PostgresError.POSTGRES_DUPLICATE_KEY_TAGS = 'duplicate key value violates unique constraint \"tags_pkey\"';
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS = 'duplicate key value violates unique constraint \"notes_tags_pkey\"';
PostgresError.POSTGRES_USER_REACHED_MAX_NOTES = 'a free user cannot have more than 50 notes';
PostgresError.POSTGRES_USER_REACHED_MAX_TAGS = 'a free user cannot have more than 50 tags';
PostgresError.POSTGRES_MAINTAGS_LIMIT = 'maintags cannot be more than 3';
PostgresError.POSTGRES_OTHERTAGS_LIMIT = 'othetags cannot be more than 15';
PostgresError.POSTGRES_TAGS_FKEY = 'insert or update on table \"notes_tags\" violates foreign key constraint \"notes_tags_tagtitle_fkey\"';
PostgresError.FINAL_DUPLICATE_KEY_NOTES = 'another note with the same title';
PostgresError.FINAL_DUPLICATE_KEY_TAGS = 'another tag with the same title';
PostgresError.FINAL_DUPLICATE_KEY_NOTES_TAGS = 'the tag is already with this note';
PostgresError.FINAL_USER_REACHED_MAX_NOTES = PostgresError.POSTGRES_USER_REACHED_MAX_NOTES;
PostgresError.FINAL_USER_REACHED_MAX_TAGS = PostgresError.POSTGRES_USER_REACHED_MAX_TAGS;
PostgresError.FINAL_MAINTAGS_LIMIT = PostgresError.POSTGRES_MAINTAGS_LIMIT;
PostgresError.FINAL_OTHERTAGS_LIMIT = PostgresError.POSTGRES_OTHERTAGS_LIMIT;
PostgresError.FINAL_TAGS_FKEY = "tags not found";
exports.PostgresError = PostgresError;
//# sourceMappingURL=const.js.map