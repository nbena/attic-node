update attic.notes
  set text=$3
  where title=$1 and userId=$2
  returning text as result;
