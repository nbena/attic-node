delete from ${schema~}.notes
  where userId=$1 and title=$2;
