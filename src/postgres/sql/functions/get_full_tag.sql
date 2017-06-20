create or replace function get_full_tag(userId varchar, title varchar) returns json as $$
declare
	tagRes json;
begin
	tagRes:=row_to_json(t)
	from (
    	select tag.title, tag.userId,
    		(
        	select
               	case
                	when json_agg(d) is null then '[]'
                	else json_agg(d)
                	end as notes
        	from(
                select noteTitle as title
               	from attic.notes_tags as rel
                where rel.userId=$1 and rel.tagTitle=tag.title
                order by noteTitle asc
                ) as d
        	) ,
 			(
            select json_array_length(json_agg(d)) as noteslength
            from (
            	select noteTitle
                from attic.notes_tags as rel
                where rel.userId=$1 and rel.tagTitle=tag.title
                order by noteTitle asc
                ) as d
           )
    	from attic.tags as tag
    	where tag.userId=$1 and tag.title=$2
    ) as t;

    return tagRes;
end
$$ language plpgsql;
