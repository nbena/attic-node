"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Const {
}
Const.ERR_USER = 'error: user is required';
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
            case PostgresError.POSTGRES_DUPLICATE_KEY_USERS:
                returnedError = PostgresError.FINAL_DUPLICATE_KEY_USERS;
                break;
            case PostgresError.POSTGRES_NOTES_FKEY:
                returnedError = PostgresError.FINAL_NOTES_FKEY;
                break;
            case PostgresError.POSTGRES_NOTE_NOT_FOUND:
                returnedError = PostgresError.FINAL_NOTE_NOT_FOUND;
                break;
            case PostgresError.POSTGRES_TAG_NOT_FOUND:
                returnedError = PostgresError.FINAL_TAG_NOT_FOUND;
                break;
        }
        return returnedError;
    }
    static isPostgresError(msg) {
        return (msg == PostgresError.POSTGRES_DUPLICATE_KEY_NOTES || msg == PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS
            || msg == PostgresError.POSTGRES_DUPLICATE_KEY_TAGS || msg == PostgresError.POSTGRES_MAINTAGS_LIMIT
            || msg == PostgresError.POSTGRES_OTHERTAGS_LIMIT || msg == PostgresError.POSTGRES_TAGS_FKEY
            || msg == PostgresError.POSTGRES_USER_REACHED_MAX_NOTES || msg == PostgresError.POSTGRES_USER_REACHED_MAX_TAGS
            || msg == PostgresError.POSTGRES_DUPLICATE_KEY_USERS || msg == PostgresError.POSTGRES_NOTES_FKEY
            || msg == PostgresError.POSTGRES_NOTE_NOT_FOUND || msg == PostgresError.POSTGRES_TAG_NOT_FOUND);
    }
}
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES = 'duplicate key value violates unique constraint \"notes_pkey\"';
PostgresError.POSTGRES_DUPLICATE_KEY_TAGS = 'duplicate key value violates unique constraint \"tags_pkey\"';
PostgresError.POSTGRES_DUPLICATE_KEY_USERS = 'duplicate key value violates unique constraint \"users_pkey\"';
PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS = 'duplicate key value violates unique constraint \"notes_tags_pkey\"';
PostgresError.POSTGRES_USER_REACHED_MAX_NOTES = 'a free user cannot have more than 50 notes';
PostgresError.POSTGRES_USER_REACHED_MAX_TAGS = 'a free user cannot have more than 50 tags';
PostgresError.POSTGRES_MAINTAGS_LIMIT = 'maintags cannot be more than 3';
PostgresError.POSTGRES_OTHERTAGS_LIMIT = 'othetags cannot be more than 10';
PostgresError.POSTGRES_NOTES_FKEY = 'insert or update on table \"notes_tags\" violates foreign key constraint \"notes_tags_notetitle_fkey\"';
PostgresError.POSTGRES_TAGS_FKEY = 'insert or update on table \"notes_tags\" violates foreign key constraint \"notes_tags_tagtitle_fkey\"';
PostgresError.POSTGRES_NOTE_NOT_FOUND = 'note not found';
PostgresError.POSTGRES_TAG_NOT_FOUND = 'tag not found';
PostgresError.FINAL_DUPLICATE_KEY_NOTES = 'another note with the same title';
PostgresError.FINAL_DUPLICATE_KEY_TAGS = 'another tag with the same title';
PostgresError.FINAL_DUPLICATE_KEY_USERS = 'another user with the same userid';
PostgresError.FINAL_DUPLICATE_KEY_NOTES_TAGS = 'the tag is already with this note';
PostgresError.FINAL_USER_REACHED_MAX_NOTES = PostgresError.POSTGRES_USER_REACHED_MAX_NOTES;
PostgresError.FINAL_USER_REACHED_MAX_TAGS = PostgresError.POSTGRES_USER_REACHED_MAX_TAGS;
PostgresError.FINAL_MAINTAGS_LIMIT = PostgresError.POSTGRES_MAINTAGS_LIMIT;
PostgresError.FINAL_OTHERTAGS_LIMIT = PostgresError.POSTGRES_OTHERTAGS_LIMIT;
PostgresError.FINAL_TAGS_FKEY = 'tags not found';
PostgresError.FINAL_NOTES_FKEY = 'notes not found';
PostgresError.FINAL_NOTE_NOT_FOUND = PostgresError.POSTGRES_NOTE_NOT_FOUND;
PostgresError.FINAL_TAG_NOT_FOUND = PostgresError.POSTGRES_TAG_NOT_FOUND;
exports.PostgresError = PostgresError;
//# sourceMappingURL=const.js.map