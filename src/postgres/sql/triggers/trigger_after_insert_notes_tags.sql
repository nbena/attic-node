create trigger trigger_after_insert_notes_tags
after insert on attic.notes_tags
for each row
execute procedure trigger_function_after_insert_notes_tags();
