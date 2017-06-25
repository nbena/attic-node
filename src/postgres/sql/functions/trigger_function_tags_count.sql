create or replace function trigger_function_tags_count () returns trigger as $$
declare
	tags_count integer;
begin
	tags_count := (select count(*) + 1
    				    from attic.tags
                where userid=new.userid
                );
   if tags_count > 50  then
   	raise exception 'a free user cannot have more than 50 tags';
   end if;
   return new;
end
$$ language plpgsql;
