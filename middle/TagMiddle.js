var Tag = require('../models/TagModel');
var Note = require('../models/NoteModel');
var Const = require('../public/javascripts/Const.js');
var Utils = require('../public/javascripts/Utils.js');
var ParamHelpMiddle = require('../public/javascripts/ParamHelpMiddle');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function getMostUsedTag(id, limitParam, cb){
  var ret = ParamHelpMiddle.tagsMostUsed(userId, cb);
    if(ret!=""){
      throw new TypeError(ret);
    }
  var result = {};
  Tag.find({_userId: id})
    .sort({notes_length:-1})
    .limit(limitParam)
    .exec()
    .then(function (data){
      result= {ok:true, result: data};
      return cb(result);
    })
    .catch(function (err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    })
}

module.exports.getMostUsedTag=getMostUsedTag;

function allTagsMin(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.find({_userId: userId},{_id: 1, title:1}).exec()
  .then(function(tags){
    result={ok: true, result: tags};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.allTagsMin=allTagsMin;

function allTagsIds(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.find({_userId: userId},{_id: 1}).exec()
  .then(function(tags){
    result={ok: true, result: tags};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.allTagsIds=allTagsIds;

function countTags(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.count({_userId: userId}).exec()
  .then(function(result){
    result={ok: true, tagCount: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.countTags=countTags;

function deleteAllTags(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.remove({})
  .then(function(result){
    return Note.update({_userId: userId},
              {otherTags: [],
              mainTags: []},
              {multi: true}).exec();
  })
  .then(function(secondResult){
    result={ok:true};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.deleteAllTags=deleteAllTags;

function deleteTagById(userId, id, cb){
  var ret = ParamHelpMiddle.userIdIdCheck(userId, id, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.findOne({_id: id, _userId: userId}).exec()
  .then(function(tag){
    if(tag){
      return tag.remove();
    }else{
      throw new Error(Cnst.ERR_TAG_NOT_FOUND);
    }
  })
  .then(function(deleteResult){
    result={ok: true};
    return cb(result);
  })
  .catch(function(err){
    result={ok:false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}

module.exports.deleteTagById=deleteTagById;

function createTag(userId, title,cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  var tag =new Tag({
    title: title,
    _userId: userId
  });
  tag.save()
  .then(function(result){
    result={ok: true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.createTag=createTag;

function tagById(userId, id, cb){
  var ret = ParamHelpMiddle.userIdIdCheck(userId, id, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.findOne({_userId: userId, _id: id})
    .populate("notes")
    .exec()
  .then(function(result){
    result={ok:true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok:false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.tagById=tagById;

function tagByTitleUnpopulated(userId, title, cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.find({_userId: userId, title: {$regex: titleToSearch}})
    .sort({title: 1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.tagByTitleUnpopulated=tagByTitleUnpopulated;

function tagByTitlePopulated(userId, title, cb){

  var result={};
  Tag.find({_userId: userId, title: {$regex: titleToSearch}})
    .populate("notes")
    .sort({title: 1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.tagByTitlePopulated=tagByTitlePopulated;

function allTagsPopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.find({_userId: userId})
    .populate("notes")
    .sort({title: 1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.allTagsPopulated=allTagsPopulated;

function allTagsUnpopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  Tag.find({_userId: userId})
    .sort({title: 1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.allTagsUnpopulated=allTagsUnpopulated;
