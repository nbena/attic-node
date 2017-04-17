select note.title, note.userId, note.isDone, note.links, note.creationDate, note.lastModificationDate, rel.tagTitle, rel.role
from attic.notes as note join attic.notes_tags as rel on title=noteTitle
where note.userId=$1
order by lastModificationDate desc, title asc;
