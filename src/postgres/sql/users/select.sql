select json_object('{userId, hashedPassword}', array[userId, hashedPassword]) as user
from attic.users
where userId=$1;
