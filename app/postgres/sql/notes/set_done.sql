update attic.notes
  set isDone = $3
  where title=$2 and userId=$1;
