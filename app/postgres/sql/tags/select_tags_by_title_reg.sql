select title, count(tagtitle)::integer as noteslength
from attic.tags as t1 left join attic.notes_tags as nt2 on title=tagtitle and (t1.userId=nt2.userId)
where t.userid=$1 and t.title like $2
and (t1.userid=nt2.userid or nt2.userid is null)
group by title, t.userId
order by noteslength desc, title asc;
