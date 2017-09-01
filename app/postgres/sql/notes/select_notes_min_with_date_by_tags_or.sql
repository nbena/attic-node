select notetitle as title, lastmodificationdate
from ${schema~}.notes_tags join ${schema~}.notes on notetitle=title and
${schema~}.notes_tags.userid = ${schema~}.notes.userid
where ${schema~}.notes_tags.userid=$1
and tagtitle in ($2)
order by title asc;
