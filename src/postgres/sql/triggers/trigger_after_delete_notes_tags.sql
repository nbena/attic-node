create trigger trigger_after_delete_notes_tags
after delete on attic.notes_tags
for each row
execute procedure trigger_function_after_delete_notes_tags();
