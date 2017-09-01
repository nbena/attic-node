select title, lastModificationDate
from ${schema~}.notes
where userId=$1
order by lastModificationDate desc, title asc;
