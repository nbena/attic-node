create trigger trigger_tags_count 
before insert on attic.tags
for each row
when (is_user_free(new.userid))
execute procedure trigger_function_tags_count();
