create trigger trigger_insert_maintags
before insert on attic.notes_tags
for each row
when (new.role='mainTags')
execute procedure trigger_function_insert_maintags();
