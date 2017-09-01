select json_object('{userid, hashedpassword}', array[userId, hashedPassword]) as user
from ${schema~}.users
where userId=$1;
