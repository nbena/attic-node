create or replace function get_user_summary(userid_in varchar) returns json as $$
	declare
    	notes_count integer;
        tags_count integer;
        available_notes integer;
        available_tags integer;
        is_free boolean;
        result_full json;
        result_data json;
     begin
     	if (not exists (
            select *
            from attic.users
            where userid=$1)) then
            result_full := json_build_object('message', 'no user found');
            return result_full;
        end if;


     	notes_count :=	(select count(*)
        				from attic.notes
                        where userid=$1);

        tags_count :=	(select count(*)
        				from attic.tags
                        where userid=$1);

        is_free :=	(select free
        			from attic.users
                    where userid=$1);


        if is_free then
        	available_notes := 50 - notes_count;
            available_tags := 50 - tags_count;
            result_data = json_build_object('notescount', notes_count, 'tagscount', tags_count, 'isfree', is_free, 'availablenotes', available_notes, 'availabletags', available_tags);
            result_full = json_build_object('userid', $1, 'data', result_data);
         else
         	result_data = json_build_object('notescount', notes_count, 'tagscount', tags_count, 'isfree', is_free);
            result_full = json_build_object('userid', $1, 'data', result_data);
         end if;

         return result_full;
     end
$$ language plpgsql;
