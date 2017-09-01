select notetitle as title
from ${schema~}.notes_tags
where ${schema~}.notes_tags.userid=$1
group by userid, notetitle
having array_agg(tagtitle) @> $2::varchar[]
order by title asc;
