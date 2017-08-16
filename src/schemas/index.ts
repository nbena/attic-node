export namespace Schemas{

  export class Auth{
    public static readonly LOGIN_SCHEMA = 'login-schema';
  }

  export class Notes{
    public static readonly ADD_TAGS_SCHEMA = 'add-tags-schema';
    public static readonly CHANGE_LINKS_SCHEMA = 'change-links-schema';
    public static readonly CHANGE_TITLE_SCHEMA = 'change-title-note-schema';
    public static readonly CHANGE_TEXT_SCHEMA = 'change-text-schema';

    public static readonly CREATE_NOTE_SCHEMA = 'create-note-schema';

    public static readonly NOTES_BY_TITLE_REG_SCHEMA = 'notes-by-title-schema';
    public static readonly NOTES_BY_TEXT_SCHEMA = 'notes-by-text-schema';

    public static readonly NOTES_BY_TAGS_NO_ROLE = 'notes-by-tags-no-role-schema';
    public static readonly NOTES_BY_TAGS_WITH_ROLE = 'notes-by-tags-with-role-schema';

    public static readonly REMOVE_TAGS_SCHEMA = 'remove-tags-schema';
    public static readonly SET_DONE_SCHEMA = 'set-done-schema';
  }

  export class Tags{

    public static readonly TAGS_BY_TITLE_REG_SCHEMA = 'tags-by-title-reg-schema';
    public static readonly CHANGE_TITLE_SCHEMA = 'change-title-tag-schema';
  }

  export class Users{

    // public static readonly CREATE_USER_SCHEMA = 'create-user-schema';
    public static readonly IS_USER_VALID_SCHEMA = 'is-user-valid-schema';

  }
}
