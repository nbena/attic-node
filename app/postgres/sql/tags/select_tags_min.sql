select title, count(tagTitle)::integer as notesLength
from ${schema~}.tags as t1 left join ${schema~}.notes_tags as nt2 on title=tagTitle and (t1.userId=nt2.userId)
where t1.userId=$1 and (t1.userId=nt2.userId or nt2.userId is null)
group by title, t1.userId
order by notesLength desc, title asc;
