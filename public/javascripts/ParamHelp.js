/*
Helpers functions that are used to check into the Controllers, to see if
the parameters of the requests are correct.
They are placed here in order to keep the Controllers as clean as
possible.
*/
function byIdCheck(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.id && !req.params.id){
    res.json({ok: false, msg: Const.ERR_ID_REQUIRED});
    ret = false;
  }
  return ret;
}
module.exports.byIdCheck = byIdCheck;

function createNoteCheck(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.note){
    res.json({ok: false, msg: Const.ERR_NOTE_REQUIRED});
    ret = false;
  }
  if(!isNoteOk(req)){
    res.json({ok: false, msg: Const.ERR_NOTE_MALF});
    ret = false;
  }
  return ret;
}
module.exports.createNoteCheck=createNoteCheck;

function isRefOk(req){
  return ((req.body.note.ref && req.body.note.ref instanceof Array) || !req.body.note.ref);
}

module.exports.isRefOk=isRefOk;

function isNoteOk(req){ //when a new note is created
  return req.body.note.title && req.body.note.text && (req.body.note.mainTags instanceof Array)
    && (req.body.note.otherTags instanceof Array) && isRefOk(req);
}
module.exports.isNoteOk=isNoteOk;

function notesByTagCheck(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.tags && !req.body.mainTags && !req.body.otherTags){
    res.json({ok: false, msg: Const.ERR_TAGS_REQUIRED});
    ret =  false;
  }
  return ret;
}
module.exports.notesByTagCheck=notesByTagCheck;

function notesByTextCheck(req, res, populate){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.text){
      res.json({ok:false, msg: Const.ERR_TEXT_REQUIRED});
      ret = false;
  }
  if(populate!=null){
    if(!populate instanceof Boolean){
      res.json({ok: false, msg: Const.ERR_INTERNAL});
      ret = false;
    }
  }
  return ret;
}
module.exports.notesByTextCheck=notesByTextCheck;


function byTitleCheck(req, res, populate){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.title){
      res.json({ok:false, msg: Const.ERR_TITLE_REQUIRED});
      ret = false;
  }
  if(populate!=null){
    if(!populate instanceof Boolean){
      res.json({ok: false, msg: Const.ERR_INTERNAL});
      ret = false;
    }
    return ret;
  }
}
module.exports.byTitleCheck=byTitleCheck;

function userPopulateCheck(req, res, populate){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(populate!=null){
    if(!populate instanceof Boolean){
      res.json({ok: false, msg: Const.ERR_INTERNAL});
      ret = false;
    }
  }
  return ret;
}
module.exports.userPopulateCheck=userPopulateCheck;

function removeAddTagsCheck(req, res, next, option){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!Utils.isTagsArrayOk(req) && !req.body.id){
    res.json({ok: false, msg: Const.ERR_TAGS_REQUIRED});
    ret = false;
  }
  if(!option === Utils.Option){
    res.json({ok: false, msg: Const.ERR_INTERNAL});
    ret = false;
  }
  return ret;
}
module.exports.removeAddTagsCheck=removeAddTagsCheck;

function removeAddRefsCheck(req, res, option){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret =  false;
  }
  if(!req.body.links || !req.body.links instanceof Array || !req.body.id){
    res.json({ok:false, msg: Const.ERR_ID_REF_REQUIRED});
    ret = false;
  }
  if(!option === Utils.Option){
    res.json({ok: false, msg: Const.ERR_INTERNAL});
    ret = false;
  }
  return ret;
}
module.exports.removeAddRefsCheck=removeAddRefsCheck;

function setDoneCheck(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  if(!req.body.id || !req.body.done){
    res.json({ok: false, msg: Const.ERR_ID_DONE_REQUIRED});
    ret = false;
  }
  return ret;
}
module.exports.setDoneCheck=setDoneCheck;

function justUser(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  return ret;
}
module.exports.justUser=justUser;


function getTagsFromReq(req){
  var array;
  if(req.body.mainTags && req.body.otherTags){
    array = req.body.mainTags.concat(req.body.otherTags);
  }else if(req.body.mainTags){
    array = req.body.mainTags;
  }else{
    array = req.body.otherTags;
  }return array;
}

module.exports.getTagsFromReq = getTagsFromReq;

function getTitle(req){
  var titleToSearch;
    if(req.body.title){
      titleToSearch = req.body.title;
    }else{
      titleToSearch = req.params.title;
    }
    return titleToSearch;
}
module.exports.getTitle = getTitle;




function getId(req){
  var par;
  if(req.method=="GET" || req.method=="DELETE"){
    par = req.params.id;
  }else{
    par =req.body.id;
  }
  return par;
}
module.exports.getId = getId;

var Getter = {
  getId: getId,
  getTitle: getTitle,
  getTagsFromReq: getTagsFromReq
}

module.exports.Getter = Getter;
