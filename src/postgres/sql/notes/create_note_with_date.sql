insert into ${schema~}.notes(userid, title, text, isdone, links, lastmodificationdate, creationdate)
    values
      ($1, $2, $3, $4, $5, $6, $7)
      returning
      json_build_object('userid', userid, 'title', title, 'text', text,
        'links', links, 'isdone', isdone,
          'creationdate', creationDate,
         'lastmodificationdate', lastModificationDate)
    as result;
