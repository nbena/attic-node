select notetitle as title
from attic.notes_tags
where userid=$1
and tagtitle in ($2)
order by title asc;
