select title, lastModificationDate
from attic.notes
where userId=$1
order by lastModificationDate desc, title asc;
