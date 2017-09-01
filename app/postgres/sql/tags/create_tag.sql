insert into ${schema~}.tags(userId, title)
  values
  ($1,$2)
returning title as result;
