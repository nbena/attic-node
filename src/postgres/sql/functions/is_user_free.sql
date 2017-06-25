create or replace function is_user_free (userid_in varchar) returns boolean as $$
declare
	returned boolean;
begin
	select free
    into returned
    from attic.users
    where userid=userid_in;

    return returned;
end
$$ language plpgsql;
