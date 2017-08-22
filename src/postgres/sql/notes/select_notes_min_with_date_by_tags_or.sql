select notetitle as title, lastmodificationdate
from attic.notes_tags join attic.notes on notetitle=title and
attic.notes_tags.userid = attic.notes.userid
where attic.notes_tags.userid=$1
and tagtitle in ($2)
order by title asc;
