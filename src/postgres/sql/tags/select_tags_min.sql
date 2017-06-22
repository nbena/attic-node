select title, count(tagTitle)::integer as notesLength
from attic.tags as t1 left join attic.notes_tags as nt2 on title=tagTitle
where t1.userId=$1 and (t1.userId=nt2.userId or nt2.userId is null) 
group by title, t1.userId
order by notesLength desc, title asc;
