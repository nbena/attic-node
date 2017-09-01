select title, text, isDone, creationDate, lastModificationDate, links
from ${schema~}.notes join ${schema~}.notes_tags on title=noteTitle
where ${schema~}.notes.userId=$1 and tagTitle=$2;
