select title, text, isDone, creationDate, lastModificationDate, links
from attic.notes join attic.notes_tags on title=noteTitle
where attic.notes.userId=$1 and tagTitle=$2;
