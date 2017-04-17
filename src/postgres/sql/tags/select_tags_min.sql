select title, count(tagTitle)::integer as notesLength
from attic.tags as t left join attic.notes_tags on title=tagTitle
where t.userId=$1
group by title, t.userId
order by notesLength desc, title asc;
