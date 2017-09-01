insert into ${schema~}.users(userid, hashedpassword)
  values ($1, $2)
returning $1
