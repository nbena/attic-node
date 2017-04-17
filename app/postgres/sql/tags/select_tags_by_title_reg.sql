select distinct title, noteTitle, role
from attic.tags left join attic.notes_tags on title=tagTitle
where title=$2 and attic.tags.userId=$1
group by title, noteTitle, role;
