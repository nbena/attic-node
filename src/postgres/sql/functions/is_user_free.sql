create or replace function is_user_free (userid_in varchar) returns boolean as $$
declare
	returned boolean;
begin
	returned:=	(select free
    					from attic.users
    					where userid=$1);
    return returned;
end
$$ language plpgsql;
