var Tag = require('../models/TagModel');
var Note = require('../models/NoteModel');
var Const = require('../public/javascripts/Const.js');
var Utils = require('../public/javascripts/Utils.js');
var ParamHelp = require('../public/javascripts/ParamHelp');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function getMostUsedTag(id, limitParam, cb){
  if (!limitParam instanceof Number){
    throw new TypeError("second arg must be Number");
  }
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
module.exports.allTagsMin=allTagsMin;

function countTags(userId, cb){
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
  }
  var result={};
  Tag.findOne({_userId: userId, _id: id}).exec()
  .then(function(result){
    result={ok:true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok:false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.tagById;

function tagByTitleUnpopulated(userId, title, cb){
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
  }
  if(!title instanceof String){
    throw new TypeError("second argument must be String");
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

function tagByTitlePopulated(id, title, cb){
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
  }
  if(!title instanceof String){
    throw new TypeError("second argument must be String");
  }
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
  if (!cb instanceof Function){
    throw new TypeError("third arg must be Function");
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
