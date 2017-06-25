create trigger trigger_notes_count
before insert on attic.notes
for each row
when (is_user_free(new.userid))
execute procedure trigger_function_notes_count();
