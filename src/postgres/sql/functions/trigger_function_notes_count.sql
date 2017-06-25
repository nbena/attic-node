create or replace function trigger_function_notes_count () returns trigger as $$
declare
	notes_count integer;
begin
	notes_count := (select count(*) + 1
    				      from attic.notes
                  where userid=new.userid
                     );
   if note_count > 50  then
   	raise exception 'a free user cannot have more than 50 notes';
   end if;
   return new;
end
$$ language plpgsql;
