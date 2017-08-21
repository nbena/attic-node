"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schemas;
(function (Schemas) {
    class Auth {
    }
    Auth.LOGIN_SCHEMA = 'login-schema';
    Schemas.Auth = Auth;
    class Notes {
    }
    Notes.ADD_TAGS_SCHEMA = 'add-tags-schema';
    Notes.CHANGE_LINKS_SCHEMA = 'change-links-schema';
    Notes.CHANGE_TITLE_SCHEMA = 'change-title-note-schema';
    Notes.CHANGE_TEXT_SCHEMA = 'change-text-schema';
    Notes.CREATE_NOTE_SCHEMA = 'create-note-schema';
    Notes.NOTES_BY_ISDONE_SCHEMA = 'notes-by-isdone-schema';
    Notes.NOTES_BY_TITLE_REG_SCHEMA = 'notes-by-title-schema';
    Notes.NOTES_BY_TEXT_SCHEMA = 'notes-by-text-schema';
    Notes.NOTES_BY_TAGS_NO_ROLE = 'notes-by-tags-no-role-schema';
    Notes.NOTES_BY_TAGS_WITH_ROLE = 'notes-by-tags-with-role-schema';
    Notes.REMOVE_TAGS_SCHEMA = 'remove-tags-schema';
    Notes.SET_DONE_SCHEMA = 'set-done-schema';
    Schemas.Notes = Notes;
    class Tags {
    }
    Tags.TAGS_BY_TITLE_REG_SCHEMA = 'tags-by-title-reg-schema';
    Tags.CHANGE_TITLE_SCHEMA = 'change-title-tag-schema';
    Schemas.Tags = Tags;
    class Users {
    }
    Users.IS_USER_VALID_SCHEMA = 'is-user-valid-schema';
    Schemas.Users = Users;
})(Schemas = exports.Schemas || (exports.Schemas = {}));
//# sourceMappingURL=index.js.map