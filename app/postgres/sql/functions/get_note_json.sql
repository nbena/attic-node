create function get_note_json(userId varchar, title varchar) returns json as $$
begin
	return (select json_build_object(t) from (
    		select attic.notes.title, text, userId, isDone, lastModificationDate, creationDate, links
    		from attic.notes
            where userId=$1 and title=$2) as t);
end;
$$ language plpgsql;
