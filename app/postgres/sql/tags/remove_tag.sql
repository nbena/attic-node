delete from ${schema~}.tags
  where userId=$1 and title=$2;
