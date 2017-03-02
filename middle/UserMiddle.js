var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');

var AuthMiddle = require('./AuthMiddle');
var Const = require('../public/javascripts/Const');

var User = require('../models/UserModel');
var ParamHelpMiddle = require('../public/javascripts/ParamHelpMiddle');
var Utils = require('../public/javascripts/Utils');

var NoteMiddle = require('./NoteMiddle');
var TagMiddle = require('./TagMiddle');

var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;


function registerUser(e_mail, password, cb){
  var ret = ParamHelpMiddle.registerUserCheck(e_mail, password, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var user = new User({
    e_mail: e_mail,
    hashedPassword: password
  })
  .save()
    .then(function(result){
      result={ok: true,
              id:result._id,
              token: 'JWT '+ AuthMiddle.generateToken(user)
            };
            return cb(result);
    })
    .catch(function(err){
      result={ok: false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}

function home(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  function getHomeNoteCount(){
    return new Promise(function(resolve, reject){
      NoteMiddle.countNotes(userId, function(firstResult){
        resolve(firstResult);
      })
    })
  };
  function getHomeTagCount(){
    return new Promise(function(resolve, reject){
      TagMiddle.countTags(userId, function(secondResult){
        resolve(secondResult);
      })
    })
  };
  getHomeNoteCount().then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.noteCount=data.noteCount;
      return getHomeTagCount();
    }else{
      result.msg=data.msg;
      return cb(result);
    }
  })
  .then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.tagCount=data.tagCount;
    }else{
      result.msg=data.msg;
    }
    return cb(result);
  })
}
module.exports.home=home;


function getAllUnpopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  function getNotes(){
    return new Promise(function(resolve, reject){
      NoteMiddle.allNotesUnpopulated(userId, function(firstResult){
        resolve(firstResult);
      })
    })
  };
  function getTags(){
    return new Promise(function(resolve, reject){
      TagMiddle.allTagsUnpopulated(userId, function(secondResult){
        resolve(secondResult);
      })
    })
  };
  getNotes().then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.notes=data.result;
      return getTags();
    }else{
      result.msg=data.msg;
      return cb(result);
    }
  })
  .then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.tags=data.result;
    }else{
      result.msg=data.msg;
    }
    return cb(result);
  })
}
module.exports.getAllUnpopulated=getAllUnpopulated;

function getAllPopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  function getNotes(){
    return new Promise(function(resolve, reject){
      NoteMiddle.allNotesPopulated(userId, function(firstResult){
        resolve(firstResult);
      })
    })
  };
  function getTags(){
    return new Promise(function(resolve, reject){
      TagMiddle.allTagsPopulated(userId, function(secondResult){
        resolve(secondResult);
      })
    })
  };
  getNotes().then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.notes=data.result;
      return getTags();
    }else{
      result.msg=data.msg;
      return cb(result);
    }
  })
  .then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.tags=data.result;
    }else{
      result.msg=data.msg;
    }
    return cb(result);
  })
}
module.exports.getAllPopulated=getAllPopulated;


function getAllMin(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  function getNotes(){
    return new Promise(function(resolve, reject){
      NoteMiddle.allNotesMin(userId, function(firstResult){
        resolve(firstResult);
      })
    })
  };
  function getTags(){
    return new Promise(function(resolve, reject){
      TagMiddle.allTagsMin(userId, function(secondResult){
        resolve(secondResult);
      })
    })
  };
  getNotes().then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.notes=data.result;
      return getTags();
    }else{
      result.msg=data.msg;
      return cb(result);
    }
  })
  .then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.tags=data.result;
    }else{
      result.msg=data.msg;
    }
    return cb(result);
  })
}
module.exports.getAllMin=getAllMin;




function getAllIds(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result={};
  function getNotes(){
    return new Promise(function(resolve, reject){
      NoteMiddle.allNotesIds(userId, function(firstResult){
        resolve(firstResult);
      })
    })
  };
  function getTags(){
    return new Promise(function(resolve, reject){
      TagMiddle.allTagsIds(userId, function(secondResult){
        resolve(secondResult);
      })
    })
  };
  getNotes().then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.notes=data.result;
      return getTags();
    }else{
      result.msg=data.msg;
      return cb(result);
    }
  })
  .then(function(data){
    if(data.ok){
      result.ok=data.ok;
      result.tags=data.result;
    }else{
      result.msg=data.msg;
    }
    return cb(result);
  })
}
module.exports.getAllIds=getAllIds;
