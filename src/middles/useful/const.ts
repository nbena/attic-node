export class Const {
  public static readonly ERR_USER:string = 'error: user is required';
  public static readonly ERR_DIFF_LENGTH:string = 'the two arrays must have the same length';
  public static readonly ERR_DB:string = 'db error';
  public static readonly TAGS_REQUIRED: string = 'maintags or othertags are required';
  public static readonly NO_ARR_INST : string = 'param must be instanceof array';
  public static readonly INVALID_NOTE: string = 'the provided param is not a valid note';
  public static readonly NOTE_REQUIRED: string = 'note.title required';
  public static readonly LINKS_REQUIRED: string = 'note.links required';
  public static readonly LINK_NOT_ARRAY: string = 'note.links is not an array';
  public static readonly IS_DONE_NOT_BOOL: string = 'note.isdone is not boolean';
  public static readonly TEXT_REQUIRED:string = 'note.text required';
  public static readonly TEXT_BASIC_REQUIRED: string = 'text required';
  public static readonly TITLE_REQUIRED:string = 'note.title required, or :title required';
  public static readonly TITLE_BASIC_REQUIRED: string = 'title required';
  public static readonly IS_DONE_REQUIRED: string = 'note.isdone required';
  public static readonly NOTE_NEW_TITLE_REQUIRED: string = 'note.newtitle required';
  public static readonly NOTE_NEW_TEXT_REUIRED: string = 'note.newtext required';

  public static readonly TAG_TITLE_REQUIRED: string = 'tag.title required';
  public static readonly TAG_TITLE_PARAM_REQUIRED: string = ':title required';
  public static readonly TAG_NEW_TITLE_REQUIRED: string = 'tag.newTitle required';

  public static readonly GEN_TAGS_REQUIRED:string = 'tags:[ ... ] required';

  public static readonly TAGS_NOT_ARRAY: string = 'maintags or othetags must be instanceof array';

  public static readonly USERNAME_AND_PASSWORD: string = 'userid and password required';

  public static readonly USERID_REQUIRED: string = ':userid required';
  public static readonly USER_MISMATCH: string = 'the authenticated user is different from the required one';

  //public static readonly ARRAY_EMPTY_NOT_ALLOWED: string = 'empty arrays are not allowed';

}

export class PostgresError {
  public static readonly POSTGRES_DUPLICATE_KEY_NOTES:string = 'duplicate key value violates unique constraint \"notes_pkey\"';
  public static readonly POSTGRES_DUPLICATE_KEY_TAGS:string = 'duplicate key value violates unique constraint \"tags_pkey\"';
  //public static readonly POSTGRES_DUPLICATE_KEY_NOTES_TAGS:string = 'error duplicate key value violates unique constraint \"notes_tags_pkey\"';
  public static readonly POSTGRES_DUPLICATE_KEY_NOTES_TAGS:string = 'duplicate key value violates unique constraint \"notes_tags_pkey\"';
  public static readonly POSTGRES_USER_REACHED_MAX_NOTES:string = 'a free user cannot have more than 50 notes';
  public static readonly POSTGRES_USER_REACHED_MAX_TAGS:string = 'a free user cannot have more than 50 tags';
  public static readonly POSTGRES_MAINTAGS_LIMIT:string = 'maintags cannot be more than 3';
  public static readonly POSTGRES_OTHERTAGS_LIMIT:string = 'othetags cannot be more than 15';
  public static readonly POSTGRES_TAGS_FKEY:string = 'insert or update on table \"notes_tags\" violates foreign key constraint \"notes_tags_tagtitle_fkey\"';

  public static readonly FINAL_DUPLICATE_KEY_NOTES:string = 'another note with the same title';
  public static readonly FINAL_DUPLICATE_KEY_TAGS:string = 'another tag with the same title';
  public static readonly FINAL_DUPLICATE_KEY_NOTES_TAGS:string = 'the tag is already with this note';
  // public static readonly FINAL_USER_REACHED_MAX_NOTES:string = PostgresError.POSTGRES_USER_REACHED_MAX_NOTES.replace('BatchError', '');
  // public static readonly FINAL_USER_REACHED_MAX_TAGS:string = PostgresError.POSTGRES_USER_REACHED_MAX_TAGS.replace('BatchError', '');
  // public static readonly FINAL_MAINTAGS_LIMIT:string = PostgresError.POSTGRES_MAINTAGS_LIMIT.replace('BatchError', '');
  // public static readonly FINAL_OTHERTAGS_LIMIT:string = PostgresError.POSTGRES_OTHERTAGS_LIMIT.replace('BatchError', '');
  public static readonly FINAL_USER_REACHED_MAX_NOTES:string = PostgresError.POSTGRES_USER_REACHED_MAX_NOTES;
  public static readonly FINAL_USER_REACHED_MAX_TAGS:string = PostgresError.POSTGRES_USER_REACHED_MAX_TAGS;
  public static readonly FINAL_MAINTAGS_LIMIT:string = PostgresError.POSTGRES_MAINTAGS_LIMIT
  public static readonly FINAL_OTHERTAGS_LIMIT:string = PostgresError.POSTGRES_OTHERTAGS_LIMIT;
  public static readonly FINAL_TAGS_FKEY:string = "tags not found";

  public static getCorrectError(error: string): string {
    let returnedError: string = error; //so don't need a default.
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

  public static isPostgresError(msg:string):boolean{
    return (msg == PostgresError.POSTGRES_DUPLICATE_KEY_NOTES || msg==PostgresError.POSTGRES_DUPLICATE_KEY_NOTES_TAGS
      || msg==PostgresError.POSTGRES_DUPLICATE_KEY_TAGS || msg==PostgresError.POSTGRES_MAINTAGS_LIMIT
      || msg==PostgresError.POSTGRES_OTHERTAGS_LIMIT || msg==PostgresError.POSTGRES_TAGS_FKEY
      || msg==PostgresError.POSTGRES_USER_REACHED_MAX_NOTES || msg==PostgresError.POSTGRES_USER_REACHED_MAX_TAGS)

  }
}
