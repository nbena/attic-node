update attic.notes set
  title=$3
  where title=$2 and userId=$1
  returning title as result;
