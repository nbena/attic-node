update attic.notes
  set links = $3
  where title = $2 and userId=$1;
