create or replace function trigger_function_insert_othertags () returns trigger as $$
declare
	before_count integer;
begin
	before_count := (select count(*) + 1
    				from attic.notes_tags
                     where role='otherTags'
                     and userid=new.userid
                     and notetitle=new.notetitle
                     );
   if before_count > 10  then
   	raise exception 'othertags cannot be more than 10';
   end if;
   return new;
end
$$ language plpgsql;
