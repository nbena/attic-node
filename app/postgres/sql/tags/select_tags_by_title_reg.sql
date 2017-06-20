select title, count(tagtitle)::integer as noteslength
from attic.tags as t left join attic.notes_tags on title=tagtitle
where t.userid=$1 and t.title like $2
group by title, t.userId
order by noteslength desc, title asc;
