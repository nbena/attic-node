select title, lastmodificationdate
from attic.notes
where userid=$1 and text like $2
order by lastmodificationdate desc, title asc;
