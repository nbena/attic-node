insert into attic.notes(userId, title, text, isDone, links)
    values
      ($1, $2, $3, $4, $5)
      returning
      json_build_object('userid', userId, 'title', title, 'text', text,
        'links', links, 'isdone', isDone,
          'creationdate', creationDate,
         'lastmodificationdate', lastModificationDate)
    as result;
