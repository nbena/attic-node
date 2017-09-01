delete from ${schema~}.notes_tags
  where userId=$1 and noteTitle=$2 and tagTitle=$3;
