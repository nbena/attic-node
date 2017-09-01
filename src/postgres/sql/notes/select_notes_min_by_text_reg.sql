select title
from ${schema~}.notes
where userid=$1 and text like $2
order by lastmodificationdate desc, title asc;
