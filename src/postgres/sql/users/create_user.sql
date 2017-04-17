insert into attic.users(userId, hashedPassword)
  values ($1, $2)
returning json_object('{userId, hashedPassword}', array[userId, hashedPassword]);
