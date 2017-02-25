var Tag = require('../models/TagModel');
var AuthController = require('./AuthController.js');
var Const = require('../public/javascripts/Const.js');
var Utils = require('../public/javascripts/Utils.js');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/*
var result = AuthController.getUserFromToken(req.headers);
if(result.user){

}else{
  res.json(result);
}
*/

function allTagsPopulatedBody(req, res, next){
  var titleToSearch = getTitle(req);
      Tag.find({_userId: req.user._id})
        .populate("notes")
        .sort({title: 1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}




function allTagsUnpopulatedBody(req, res, next){
      var titleToSearch = req.body.title;
      Tag.find({_userId: req.user._id})
        .populate("notes")
        .sort({title: 1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}

function allTagsWrapper(req, res, next, populate){
  var ret = Utils.Check.userPopulateCheck(req, res, populate);
  if(!ret){
    return;
  }
  if(populate){
    allTagsPopulatedBody(req, res, next);
  }else{
    allTagsUnpopulatedBody(req, res, next);
  }
}

function allTagsUnpopulated(req, res, next){
  allTagsWrapper(req, res, next, false);
}
module.exports.allTagsUnpopulated=allTagsUnpopulated;

function allTagsPopulated(req, res, next){
  allTagsWrapper(req, res, next, true);
}
module.exports.allTagsPopulated=allTagsPopulated;


//why not switch between population by a flag into the the req? Easy, because
//so I can do a GET with no para (simpler).



function tagByTitlePopulatedBody(req, res, next){
  var titleToSearch = getTitle(req);
      Tag.find({_userId: req.user._id, title: {$regex: titleToSearch}})
        .populate("notes")
        .sort({title: 1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}




function tagByTitleUnpopulatedBody(req, res, next){
      var titleToSearch = req.body.title;
      Tag.find({_userId: req.user._id, title: {$regex: titleToSearch}})
        .populate("notes")
        .sort({title: 1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}

function tagByTitleWrapper(req, res, next, populate){
  var ret = Utils.Check.byTitleCheck(req, res, populate);
  if(!ret){
    return;
  }
  if(populate){
    tagByTitlePopulatedBody(req, res, next);
  }else{
    tagByTitleUnpopulatedBody(req, res, next);
  }
}

function tagByTitleUnpopulated(req, res, next){
  tagByTitleWrapper(req, res, next, false);
}
module.exports.tagByTitleUnpopulated = tagByTitleUnpopulated;

function tagByTitlePopulated(req, res, next){
  tagByTitleWrapper(req, res, next, true);
}
module.exports.tagByTitlePopulated = tagByTitlePopulated;




function tagById(req, res, next){
  var ret = Utils.Check.byIdCheck(req, res);
  if(!ret){
    return;
  }
  var id = Utils.getId(req);
      Tag.findOne({_userId: req.user._id, _id: id}).exec()
      .then(function(result){
        res.json({ok:true, result: result});
      })
      .catch(function(err){
        res.json({ok:false, msg: Utils.jsonErr(err)});
      });
}

module.exports.tagById = tagById;



//put
//api/notes/:title PUT
//api/notes/create PUT body:{"title":"new-title"}
function createTag(req, res, next){
  var ret=Utils.Check.byTitleCheck(req, res);
  if(!ret){
    return;
  }
  var titleToSearch = Utils.getTitle(req);
      var tag =new Tag({
        title: titleToSearch,
        _userId: req.user._id
      });
      tag.save()
      .then(function(result){
        res.json({ok: true, result: result});
      })
      .catch(function(err){
        res.json({ok: false, msg: Utils.jsonErr(err)});
      });
}

module.exports.createTag = createTag;


//delete
function deleteTagById(req, res, next){
  var ret = Utils.Check.byIdCheck(req, res);
  if(!ret){
    return;
  }
  Tag.findOne({_id: req.params.id, _userId: req.user._id}).exec()
  .then(function(tag){
    if(tag){
      return tag.remove();
    }else{
      throw new Error(Cnst.ERR_TAG_NOT_FOUND);
    }
  })
  .then(function(deleteResult){
    res.json({ok: true});
  })
  .catch(function(err){
    res.json({ok:false, msg: Utils.jsonErr(err)});
  });
}

module.exports.deleteTagById = deleteTagById;


function deleteAllTags(req, res, next){
  var ret = Utils.Check.justUser(req, res);
  if(!ret){
    return;
  }
  Tag.remove({})
  .then(function(result){
    return Note.update({_userId: req.user._id},
              {otherTags: [],
              mainTags: []},
              {multi: true}).exec();
  })
  .then(function(secondResult){
    res.json({ok:true});
  })
  .catch(function(err){
    res.json({ok: false, msg: Utils.jsonErr(err)});
  });
}

module.exports.deleteAllTags = deleteAllTags;


function countTags(req, res, next){
  var ret = Utils.Check.justUser(req, res);
  if(!ret){
    return;
  }
  Tag.count().exec()
  .then(function(result){
    res.json({ok: true, tagCount: result});
  })
  .catch(function(err){
    res.json({ok: false, msg: Utils.jsonErr(err)});
  });
}


module.exports.countTags = countTags;