select notetitle as title, lastmodificationdate
from attic.notes_tags join attic.notes on notetitle=title and attic.notes_tags.userid=attic.notes.userid
where attic.notes_tags.userid=$1
group by attic.notes_tags.userid, notetitle, lastmodificationdate
having array_agg(tagtitle) @> $2::varchar[]
order by lastmodificationdate desc, title asc;
