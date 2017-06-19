export default class Const{
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
  public static readonly TITLE_REQUIRED:string = 'note.title required';
  public static readonly TITLE_BASIC_REQUIRED: string = 'title required';
  public static readonly IS_DONE_REQUIRED: string = 'note.isdone required';
  public static readonly NOTE_NEW_TITLE_REQUIRED: string = 'note.newtitle required';
  public static readonly NOTE_NEW_TEXT_REUIRED: string = 'note.newtext required';

  public static readonly TAG_TITLE_REQUIRED: string = 'tag.title required';
  public static readonly TAG_TITLE_PARAM_REQUIRED: string = ':title required';
  public static readonly TAG_NEW_TITLE_REQUIRED: string = 'tag.newTitle required';

  public static readonly GEN_TAGS_REQUIRED:string = 'tags:[ ... ] required';

  public static readonly TAGS_NOT_ARRAY: string = 'maintags or othetags must be instanceof array';

  //public static readonly ARRAY_EMPTY_NOT_ALLOWED: string = 'empty arrays are not allowed';

}
