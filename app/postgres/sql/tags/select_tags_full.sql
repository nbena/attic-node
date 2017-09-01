select title, noteTitle, count(tagTitle) as c
from ${schema~}.tags left join ${schema~}.notes_tags on title=tagTitle
where ${schema~}.tags.userId=$1
group by title, noteTitle
order by c desc, title asc;
