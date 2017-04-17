create or replace function get_just_created_note(userId varchar, title varchar) returns Note as $$
  declare
  	result json;
  begin
  	result:= json_build_object('userId', userId, 'title', title, 'text', text, 'lastModificationDate', lastModificationDate, 'creationDate', creationDate, 'isDone', isDone, 'links', links);
   	return result;
  end;
$$ language plpgsql;
