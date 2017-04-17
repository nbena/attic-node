insert into attic.notes_tags(userId, noteTitle, tagTitle, role)
  values
    ($1, $2, $3, $4)
  returning noteTitle;
