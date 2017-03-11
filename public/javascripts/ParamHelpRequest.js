var Const = require('./Const');
var Utils  = require('./Utils');
/*
Helpers functions that are used to check into the Controllers, to see if
the parameters of the requests are correct.
They are placed here in order to keep the Controllers as clean as
possible.
*/
function byIdCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.id && !req.params.id){
    ret = {ok: false, msg: Const.ERR_ID_REQUIRED};
  }
  return ret;
}
module.exports.byIdCheck = byIdCheck;

function createNoteCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.note){
    ret = {ok: false, msg: Const.ERR_NOTE_REQUIRED};
  }
  console.log(isRefOk(req));
  if(!isNoteOk(req)){
    ret = {ok: false, msg: Const.ERR_NOTE_MALF};
  }
  return ret;
}
module.exports.createNoteCheck=createNoteCheck;

function isRefOk(req){
  return ((req.body.note.links && req.body.note.links instanceof Array) || !req.body.note.links);
}

module.exports.isRefOk=isRefOk;

function isNoteOk(req){ //when a new note is created
  return req.body.note.title && req.body.note.text && (req.body.note.mainTags instanceof Array)
    && (req.body.note.otherTags instanceof Array) && isRefOk(req);
}
module.exports.isNoteOk=isNoteOk;

function notesByTagCheck(req){
  var ret = {};
  ret.ok = true;;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.tags && !req.body.mainTags && !req.body.otherTags){
    ret = {ok: false, msg: Const.ERR_TAGS_REQUIRED};
  }
  return ret;
}
module.exports.notesByTagCheck=notesByTagCheck;

function notesByTextCheck(req){
  var ret = {};
  ret.ok = true;;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.text){
      ret = {ok:false, msg: Const.ERR_TEXT_REQUIRED};
  }
  return ret;
}
module.exports.notesByTextCheck=notesByTextCheck;

function notesUpdateTextCheck(req){
  var ret = {};
  ret.ok = true;;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.text){
      ret = {ok:false, msg: Const.ERR_TEXT_REQUIRED};
  }
  if(!req.body.id){
    ret = {ok: false, msg: Const.ERR_ID_REQUIRED};
  }
  return ret;
}
module.exports.notesUpdateTextCheck=notesUpdateTextCheck;


function byTitleCheck(req){
  var ret = {};
  ret.ok = true;;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.title && !req.params.title){
      ret = {ok:false, msg: Const.ERR_TITLE_REQUIRED};
  }
    return ret;
  }
module.exports.byTitleCheck=byTitleCheck;

// function userPopulateCheck(req){
//   var ret = {};
//   ret.ok = true;
//   if(!req.user){
//     ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
//   }
//   return ret;
// }
// module.exports.userPopulateCheck=userPopulateCheck;

function mainTagsOrOtherTagsOk(req){
  if(req.body.mainTags  && req.body.otherTags){
    return (req.body.mainTags instanceof Array) &&
      (req.body.otherTags instanceof Array);
  }
  if(req.body.mainTtags){
    return req.body.mainTags instanceof Array;
  }
  if(req.body.otherTags){
    return req.body.otherTags instanceof Array;
  }
}


function notesRemoveAddTagsCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!mainTagsOrOtherTagsOk(req) && !req.body.id){
    ret = {ok: false, msg: Const.ERR_TAGS_REQUIRED};
  }
  return ret;
}
module.exports.notesRemoveAddTagsCheck=notesRemoveAddTagsCheck;

function notesRemoveAddLinksCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
    ret =  false;
  }
  if(!req.body.links || !req.body.links instanceof Array || !req.body.id){
    ret = {ok:false, msg: Const.ERR_ID_REF_REQUIRED};
  }
  return ret;
}
module.exports.notesRemoveAddLinksCheck=notesRemoveAddLinksCheck;

function notesDoneCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  if(!req.body.id || !req.body.done){
    ret = {ok: false, msg: Const.ERR_ID_DONE_REQUIRED};
  }
  return ret;
}
module.exports.notesDoneCheck=notesDoneCheck;

function justUser(req){
  var ret = {};
  ret.ok = true;
  if(!req.user){
    ret = {ok: false, msg: Const.ERR_TOKEN_REQUIRED};
  }
  return ret;
}
module.exports.justUser=justUser;

function registerCheck(req){
  var ret = {};
  ret.ok = true;
  if(!req.body.e_mail || !req.body.password){
    ret = {ok: false, msg: Const.ERR_MAIL_PASS_REQUIRED};
  }
  return ret;
}
module.exports.registerCheck=registerCheck;


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
