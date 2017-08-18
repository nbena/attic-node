create or replace function trigger_function_after_insert_notes_tags () returns trigger as $$
begin
		update attic.notes set lastmodificationdate = clock_timestamp()
    	where userid=new.userid and title=new.notetitle;
		return new;
end
$$ language plpgsql;
