update ${schema~}.notes set
  title=$3
  where title=$2 and userId=$1;
