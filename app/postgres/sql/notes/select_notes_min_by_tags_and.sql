select notetitle as title
from attic.notes_tags
where attic.notes_tags.userid=$1
group by userid, notetitle
having array_agg(tagtitle) @> $2::varchar[]
order by title asc;
