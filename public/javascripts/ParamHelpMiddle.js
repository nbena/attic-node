function justCbUserIdCheck(userId, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.justCbUserIdCheck=justCbUserIdCheck;

function byTitleCheck(userId, title, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(!title instanceof String || title==null){
    ret="title must be instanceof String";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.byTitleCheck=byTitleCheck;

function notesUpdateTitleCheck(userId, _id, title, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(!_id instanceof String || _id==null){
    ret="id must be instanceof String";
  }
  if(!title instanceof String || title==null){
    ret="title must be instanceof String";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.notesUpdateTitleCheck=notesUpdateTitleCheck;

function notesByTextCheck(userId, text, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(!text instanceof String || text==null){
    ret="text must be instanceof String";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.notesByTextCheck=notesByTextCheck;

function notesUpdateTextCheck(userId, id, text, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(id==null){
    ret="id required";
  }
  if(!text instanceof String || text==null){
    ret="text must be instanceof String";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.notesUpdateTextCheck=notesUpdateTextCheck;

function userIdIdCheck(userId, id, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(userId==null){
    ret="userId required";
  }
  if(id==null){
    ret="id required";
  }
  return ret;
}
module.exports.userIdIdCheck=userIdIdCheck;

function notesByTagCheck(userId, mainTags, otherTags, tags, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(mainTags != null && !mainTags instanceof Array){
    ret="mainTags must be instanceof Array";
  }
  if(otherTags != null && !otherTags instanceof Array){
    ret="otherTags must be instanceof Array";
  }
  if(!tags instanceof Array && tags==null){
    ret="tags must be instanceof Array";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.notesByTagCheck=notesByTagCheck;

function userIdNoteCheck(userId, note, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(!note instanceof Object || note==null){
    ret="note must be instanceof Object";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.userIdNoteCheck=userIdNoteCheck;

function notesAddRemoveTagsCheck(userId, id, mainTags, otherTags, tags, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(mainTags != null && !mainTags instanceof Array){
    ret="mainTags must be instanceof Array";
  }
  if(otherTags != null && !otherTags instanceof Array){
    ret="otherTags must be instanceof Array";
  }
  if(!tags instanceof Array || tags==null){
    ret="tags must be instanceof Array";
  }
  if(id==null){
    ret="id required";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.notesAddRemoveTagsCheck=notesAddRemoveTagsCheck;

function notesAddRemoveLinksCheck(userId, id, links, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(id==null){
    ret="id required";
  }
  if(userId==null){
    ret="userId required";
  }
  if(!links instanceof Array || links==null){
    ret="links must be instanceof Array";
  }
  return ret;
}
module.exports.notesAddRemoveLinksCheck=notesAddRemoveLinksCheck;

function notesDoneCheck(userId, id, done, cb){
  var ret="";
  if(!cb instanceof Function || cb==null){
    ret="cb must be instanceof Function";
  }
  if(id==null){
    ret="id required";
  }
  if(userId==null){
    ret="userId required";
  }
  if(!done instanceof Boolean || done==null){
    ret="done must be instanceof Boolean";
  }
  return ret;
}
module.exports.notesDoneCheck=notesDoneCheck;

function tagsMostUsed(userId, limitParam, cb){
  var ret = "";
  if (!limitParam instanceof Number){
    ret = "second arg must be Number";
  }
  if(!cb instanceof Function){
    ret = "cb must be instanceof Function";
  }
  if(userId==null){
    ret="userId required";
  }
  return ret;
}
module.exports.tagsMostUsed=tagsMostUsed;

function registerUserCheck(e_mail, password, cb){
  var ret = "";
  if(!cb instanceof Function){
    ret = "cb must be instanceof Function";
  }
  if(!e_mail instanceof String){
    ret = "e_mail must be instanceof String";
  }
  if(!password instanceof String){
    ret = "password must be instanceof String";
  }
  return ret;
}
