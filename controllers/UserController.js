var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');

var AuthController = require('./AuthController');
var Const = require('../public/javascripts/Const');

var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');
var ParamHelp = require('../public/javascripts/ParamHelp');
var Utils = require('../public/javascripts/Utils');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function registerUser(req, res, next){
  var ret = ParamHelp.registerCheck(req, res);
  if(!ret){
    return;
  }
  var user = new User({
    e_mail: req.body.e_mail,
    hashedPassword: req.body.password
  })
  .save()
    .then(function(result){
      res.json({ok: true,
              id:result._id,
              token: 'JWT '+ AuthController.generateToken(user)
            });
    })
    .catch(function(err){
      res.json({ok: false, msg: Utils.jsonErr(err)});
    });
}


module.exports.registerUser = registerUser;




function home(req, res, next){
  if(req.user){
    var obj = {};
    var promise = Note.count({_userId: req.user._id}).exec();
    promise.then(function(noteCount){
      obj.noteCount=noteCount;
      return Tag.count({_userId: req.user._id}).exec();
    })
    .then(function(tagCount){
      obj.tagCount=tagCount;
      return tagCount;
    })
    .then(function(tagCount){
      return res.json({ok: true, result: obj});
    })
    .catch(function(err){
      res.json({ok: false, msg: err});
    });

  }else{
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
  }
}
module.exports.home = home;

function getAll(req, res, next){
  var ret = ParamHelp.userCheck(req, res);
  if(!ret){
    return;
  }
  var result = {};
  Note.find({_userId: req.user._id}).exec()
  .then(function(notes){
    result.notes=notes;
    return Tag.find({_userId: req.user._id}).exec()
  })
  .then(function(tags){
    result.tags=tags;
    return res.json({ok: true, result: result});
  })
  .catch(function(err){
    res.json({ok: false, msg: Utils.jsonErr(err)});
  });
}
