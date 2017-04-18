select json_object('{userid, hashedpassword}', array[userId, hashedPassword]) as user
from attic.users
where userId=$1;
