create trigger trigger_insert_othertags
before insert on attic.notes_tags
for each row
when (new.role='otherTags')
execute procedure trigger_function_insert_othertags();
