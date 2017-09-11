-- create or replace function get_full_note(userId varchar, title varchar) returns json as $$
-- declare
-- 	noteRes json;
-- begin
-- 	noteRes:=  row_to_json(t)
-- 			from (
--     			select note.title, note.userId, text, isDone, links, creationDate, lastModificationDate,
--     				(
--         				select
--                         	case
--                 				when json_agg(d_mainTags) is null then '[]'
--                 				else json_agg(d_mainTags)
--                 	end as mainTags
--         				from (
--                 			select tagTitle as title
--                				from attic.notes_tags as rel
--                 			where rel.userId=$1 and rel.noteTitle=note.title and role='mainTags'
--                 			order by tagTitle asc
--                 		) as d_mainTags
--         			) ,
--  					(
--                 		select
--                             case
--                 				when json_agg(d_otherTags) is null then '[]'
--                 				else json_agg(d_otherTags)
--                 	end as otherTags
--                 		from (
--                     		select tagTitle as title
--                     		from attic.notes_tags as rel
--                    			where rel.userId=$1 and rel.noteTitle=note.title and role='otherTags'
--                     		order by tagTitle asc
--                 		) as d_otherTags
--              		)
--     	from attic.notes as note
--     	where note.userId=$1 and note.title=$2
--     ) as t;
--
--     return noteRes;
-- end
-- $$ language plpgsql;

create or replace function get_full_note2(userId varchar, title varchar) returns json as $$
declare
	noteRes json;
    aggOtherTags json;
    aggMainTags json;
begin

    aggMainTags := json_agg(main)
    				from
                    (
                    select tagTitle as title
              			from attic.notes_tags as rel
              			where rel.userId=$1 and rel.noteTitle=$2 and role='mainTags'
               			order by tagTitle asc
                    ) as main;


    aggOtherTags := json_agg(other)
    				from
                    (
                    select tagTitle as title
              			from attic.notes_tags as rel
              			where rel.userId=$1 and rel.noteTitle=$2 and role='otherTags'
               			order by tagTitle asc
                    ) as other;

    if aggMainTags is null then
    	aggMainTags := '[]'::json;
     end if;

    if aggOtherTags is null then
    	aggOtherTags := '[]'::json;
     end if;



	noteRes:=  row_to_json(t)
    from (
        select *, aggMainTags as mainTags, aggOtherTags as otherTags
        from attic.notes as n
        where n.title=$2 and n.userid=$1
        ) as t;

    return noteRes;
end
$$ language plpgsql;
