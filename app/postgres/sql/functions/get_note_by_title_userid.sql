create or replace function get_note_by_title_userid(userId varchar, title varchar) returns Note as $$
  declare
  	mainTags json;
      otherTags json;
      note json;
      noteInit Note;
  begin

  	-- selecting mainTags
      mainTags := json_agg(t)
                                          from(
                                              select tagTitle
                                              from attic.notes_tags
                                              where attic.notes_tags.userId=$1
                                              	and role='mainTags'
                                              	and noteTitle=$2
                                              ) as t;

     -- selecting otherTags
     otherTags := json_agg(t)
                                          from(
                                              select tagTitle
                                              from attic.notes_tags
                                              where attic.notes_tags.userId=$1
                                              	and role='otherTags'
                                              	and noteTitle=$2
                                              ) as t;

     -- selecting note

     -- select attic.notes.title, attic.notes.userId, text, isDone, lastModificationDate, creationDate, links
     -- into noteInit.title, noteInit.userId, noteInit.text, noteInit.isDone, noteInit.lastModificationDate, noteInit.creationDate, noteInit.links
     --  from attic.notes
     -- where attic.notes.userId=$1 and attic.notes.title=$2;


     noteInit := get_note($1, $2);

     note := json_build_object('note', json_build_object('title', noteInit.title, 'text', noteInit.text, 'mainTags', mainTags, 'otherTags', otherTags, 'isDone', noteInit.isDone,
                                                        'links', noteInit.links, 'lastModificationDate', noteInit.lastModificationDate, 'creationDate', noteInit.creationDate));

   	return note;
  end;

$$ language plpgsql;
