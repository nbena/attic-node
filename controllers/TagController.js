var Tag = require('../models/TagModel');
var AuthController = require('./AuthController.js');
var Const = require('../public/javascripts/Const.js');
var Utils = require('../public/javascripts/Utils.js');
var ParamHelp = require('../public/javascripts/ParamHelp');

var TagMiddle = require('../middle/TagMiddle');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/*
var result = AuthController.getUserFromToken(req.headers);
if(result.user){

}else{
  res.json(result);
}
*/



function allTagsUnpopulated(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.allTagsUnpopulated(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.allTagsUnpopulated=allTagsUnpopulated;

function allTagsPopulated(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.allTagsPopulated(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.allTagsPopulated=allTagsPopulated;



function tagByTitleUnpopulated(req, res, next){
  var ret = ParamHelp.byTitleCheck(req, res);
  if(!ret){
    return;
  }
  var title = ParamHelp.Getter.getTitle(req);
  TagMiddle.tagByTitleUnpopulated(req.user._id, title, function(result){
    res.json(result);
  });
}
module.exports.tagByTitleUnpopulated = tagByTitleUnpopulated;

function tagByTitlePopulated(req, res, next){
  var ret = ParamHelp.byTitleCheck(req);
  if(!ret){
    return;
  }
  var title = ParamHelp.Getter.getTitle(req);
  TagMiddle.tagByTitlePopulated(req.user._id, title, function(result){
    res.json(result);
  });
}
module.exports.tagByTitlePopulated = tagByTitlePopulated;




function tagById(req, res, next){
  var ret = ParamHelp.byIdCheck(req, res);
  if(!ret){
    return;
  }
  var id = ParamHelp.Getter.getId(req);
  TagMiddle.tagById(req.user._id, id, function(result){
    res.json(result);
  });
}

module.exports.tagById = tagById;



//put
//api/notes/:title PUT
//api/notes/create PUT body:{"title":"new-title"}
function createTag(req, res, next){
  var ret=ParamHelp.byTitleCheck(req, res);
  if(!ret){
    return;
  }
  var title = ParamHelp.Getter.getTitle(req);
  TagMiddle.createTag(req.user._id, title, function(result){
    res.json(result);
  });
}

module.exports.createTag = createTag;


//delete
function deleteTagById(req, res, next){
  var ret = ParamHelp.byIdCheck(req, res);
  if(!ret){
    return;
  }
  var id = ParamHelp.getId(req);
  TagMiddle.deleteTagById(req.user._id, id, function(result){
    res.json(result);
  });
}

module.exports.deleteTagById = deleteTagById;


function deleteAllTags(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.deleteAllTags(req.user._id, function(result){
    res.json(result);
  });
}

module.exports.deleteAllTags = deleteAllTags;


function countTags(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.countTags(req.user._id, function(result){
    res.json(result);
  });
}


module.exports.countTags = countTags;

function allTagsMin(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.allTagsMin(req.user._id, function(result){
    res.json(result);
  });
}

module.exports.allTagsMin=allTagsMin;

function mostUsed(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
  TagMiddle.getMostUsedTag(req.user._id, 8, function(result){
    res.json(result);
  });
}
module.exports.mostUsed=mostUsed;
