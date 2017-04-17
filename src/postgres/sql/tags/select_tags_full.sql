select title, noteTitle, count(tagTitle) as c
from attic.tags left join attic.notes_tags on title=tagTitle
where attic.tags.userId=$1
group by title, noteTitle
order by c desc, title asc;
