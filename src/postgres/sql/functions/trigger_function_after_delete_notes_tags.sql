create or replace function trigger_function_after_delete_notes_tags () returns trigger as $$
begin
    	update attic.notes set lastmodificationdate = clock_timestamp()
        where userid=old.userid and title=old.notetitle;
        return old;
end
$$ language plpgsql;
