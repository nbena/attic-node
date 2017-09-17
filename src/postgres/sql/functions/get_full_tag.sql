-- create or replace function get_full_tag(userId varchar, title varchar) returns json as $$
-- declare
-- 	tagRes json;
-- begin
-- 	tagRes:=row_to_json(t)
-- 	from (
--     	select tag.title, tag.userId,
--     		(
--         	select
--                	case
--                 	when json_agg(d) is null then '[]'
--                 	else json_agg(d)
--                 	end as notes
--         	from(
--                 select noteTitle as title
--                	from attic.notes_tags as rel
--                 where rel.userId=$1 and rel.tagTitle=tag.title
--                 order by noteTitle asc
--                 ) as d
--         	) ,
--  			(
--             select
-- 							case
-- 								when json_array_length(json_agg(d)) is null then 0
-- 								else json_array_length(json_agg(d))
-- 								end as noteslength
--             from (
--             	select noteTitle
--                 from attic.notes_tags as rel
--                 where rel.userId=$1 and rel.tagTitle=tag.title
--                 order by noteTitle asc
--                 ) as d
--            )
--     	from attic.tags as tag
--     	where tag.userId=$1 and tag.title=$2
--     ) as t;
--
--     return tagRes;
-- end
-- $$ language plpgsql;
create or replace function get_full_tag(userId varchar, title varchar) returns json as $$
declare
		tagRes json;
    notes json;
    noteslength integer;
begin

    notes := json_agg(notes_row)
    from (
                select noteTitle as title
               	from attic.notes_tags as rel
                where rel.userId=$1 and rel.tagTitle=$2
                order by noteTitle asc
        ) as notes_row;

     if notes is null then
     	notes := '[]'::json;
     end if;

     noteslength := json_array_length(notes);

     tagRes:= row_to_json(t)
     from (
         select t.title, notes, noteslength
         from attic.tags as t
         where t.userid=$1 and t.title=$2
     ) as t;

		if tagRes is null then
	      raise exception 'tag not found';
	  end if;

		return tagRes;
end
$$ language plpgsql;
