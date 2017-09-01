select case
	when (select userid
		from ${schema~}.users
		where userid=$1) is null then true
    else false
    end as isavailable;
