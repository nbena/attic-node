update ${schema~}.tags
  set title=$3
  where userId=$1 and title=$2;
