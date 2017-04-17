insert into attic.notes(userId, title, text, links)
    values
      ($1, $2, $3, $4)
      returning
      json_object('{userId, title, text, isDone, links, creationDate, lastModificationDate}',
        array[userId, title, text, isDone::varchar, links::varchar, creationDate::varchar, lastModificationDate::varchar])
        as result;
