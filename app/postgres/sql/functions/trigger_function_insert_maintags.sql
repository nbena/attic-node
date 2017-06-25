create or replace function trigger_function_insert_maintags () returns trigger as $$
declare
	before_count integer;
begin
	before_count := (select count(*) + 1
    				from attic.notes_tags
                     where role='mainTags'
                     and userid=new.userid
                     and notetitle=new.notetitle
                     );
   if before_count > 3  then
   	raise exception 'maintags cannot be more than 3';
   end if;
   return new;
end
$$ language plpgsql;
