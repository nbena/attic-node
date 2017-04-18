insert into attic.notes(userId, title, text, isDone, links)
    values
      ($1, $2, $3, $4, $5)
      returning
      json_build_object('userId', userId, 'title', title, 'text', text,
        'links', links, 'isDone', isDone,
          'creationDate', creationDate,
         'lastModificationDate', lastModificationDate)
    as result;
