insert into attic.notes(userId, title, text)
    values
      ($1, $2, $3)
      returning json_build_object('userId', userId, 'title', title, 'text', text, 'lastModificationDate', lastModificationDate, 'creationDate', creationDate, 'isDone', isDone, 'links', links) as result;
