create or replace function get_note(userId varchar, title varchar) returns Note as $$
  declare
  	note Note;
  begin
  	select attic.notes.title, text, attic.notes.userId, isDone, links, lastModificationDate, creationDate
      into note.title, note.text, note.userId, note.isDone, note.links, note.lastModificationDate, note.creationDate
      from attic.notes
      where attic.notes.userId=$1 and attic.notes.title=$2;
      return note;
  end;
$$ language plpgsql;
