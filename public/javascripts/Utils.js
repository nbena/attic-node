function pushIfNotPresent(firstArray, secondArray){
  // if(!(firstArray instanceof Array) && !(secondArray instanceof Array)){
  //   throw new TypeError("first and second arg must be Array");
  // }else{
  //   for(var i=0;i<secondArray.length;i++){
  //       if(firstArray.indexOf(secondArray[i])==-1){
  //         firstArray.push(secondArray[i]);
  //       }
  //   }
  // }
  // return firstArray;
  var array = [];
  if(!(firstArray instanceof Array) && !(secondArray instanceof Array)){
    throw new TypeError("first and second arg must be Array");
  }else{
    array = firstArray.slice();
    console.log("first array is", array);
    console.log("second array is", secondArray);
    for(var i=0;i<secondArray.length;i++){
        if(array.indexOf(secondArray[i])==-1){
          array.set(i, secondArray[i]);
        }
    }
  }
  console.log("the array now is: ", array);
  return array;
}

module.exports.pushIfNotPresent = pushIfNotPresent;

function pushIfNotPresentMongoose(firstArray, secondArray){
  if(!(firstArray instanceof Array) && !(secondArray instanceof Array)){
    throw new TypeError("the two args must be instanceof Array");
  }else{
    var j=firstArray.length;
    for(var i=0;i<secondArray.length;i++,j++){
      if(firstArray.indexOf(secondArray[i])==-1){
        firstArray.set(j, secondArray[i]);
      }
    }
  }
}

module.exports.pushIfNotPresentMongoose = pushIfNotPresentMongoose;

/*
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

*/
function arrayDiff(arg0, arg1){
  if(!(arg0 instanceof Array)  && !(arg1 instanceof Array)){
    throw new TypeError("the thwo args must be Array");
  }
  return arg0.filter(function(el){
      return arg1.indexOf(el)<0;
    })
  }

  module.exports.arrayDiff = arrayDiff;

  function jsonErr(err){
    return err.name+" "+err.message;
  }
  module.exports.jsonErr = jsonErr;

  function isTagsArrayOk(req){
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
  module.exports.isTagsArrayOk = isTagsArrayOk;

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

  const Option={ADD:0, REMOVE:1};
  module.exports.Option = Option;


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

function isRefOk(req){
  return ((req.body.note.ref && req.body.note.ref instanceof Array) || !req.body.note.ref);
}

function isNoteOk(req){ //when a new note is created
  return req.body.note.title && req.body.note.text && (req.body.note.mainTags instanceof Array)
    && (req.body.note.otherTags instanceof Array) && isRefOk(req);
}

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
  return false;
}

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

function justUser(req, res){
  var ret = true;
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
    ret = false;
  }
  return ret;
}

var Check = {
  byIdCheck : byIdCheck,
  createNoteCheck: createNoteCheck,
  isNoteOk: isNoteOk,
  isRefOk: isRefOk,
  notesByTagCheck: notesByTagCheck,
  notesByTextCheck: notesByTextCheck,
  byTitleCheck: byTitleCheck,
  userPopulateCheck: userPopulateCheck,
  removeAddTagsCheck: removeAddTagsCheck,
  removeAddRefsCheck: removeAddRefsCheck,
  setDoneCheck: setDoneCheck,
  justUser: justUser

}
module.exports.Check=Check;
