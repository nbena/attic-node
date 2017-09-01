select notetitle as title, lastmodificationdate
from ${schema~}.notes_tags join ${schema~}.notes on notetitle=title and ${schema~}.notes_tags.userid=${schema~}.notes.userid
where ${schema~}.notes_tags.userid=$1
group by ${schema~}.notes_tags.userid, notetitle, lastmodificationdate
having array_agg(tagtitle) @> $2::varchar[]
order by lastmodificationdate desc, title asc;
