select title, text, isDone, creationDate, lastModficationDate, links
from attic.notes join attic.notes_tags on title=noteTitle
where attic.notes.userId=$1 and tagTitle=$2 and role=$3;
