select title, lastmodificationdate
from attic.notes
where userid=$1 and isdone=$2
order by lastmodificationdate desc, title asc;
