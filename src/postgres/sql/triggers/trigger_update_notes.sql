create trigger trigger_update_notes
after update of title, text, isdone, links on attic.notes
for each row
execute procedure trigger_function_update_notes();
