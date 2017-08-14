update attic.notes
  set text=$3
  where title=$2 and userId=$1
  -- returning text as result;
