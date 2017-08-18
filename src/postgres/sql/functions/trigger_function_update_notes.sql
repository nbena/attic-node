create or replace function trigger_function_update_notes () returns trigger as $$
begin
	update attic.notes set lastmodificationdate = clock_timestamp()
    where userid=new.userid and title=new.title;
	return new;
end
$$ language plpgsql;
