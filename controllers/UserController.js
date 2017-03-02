var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');

// var AuthController = require('./AuthController');
var Const = require('../public/javascripts/Const');

var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');
var ParamHelpRequest = require('../public/javascripts/ParamHelpRequest');
var Utils = require('../public/javascripts/Utils');
var UserMiddle = require('../middle/UserMiddle');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function registerUser(req, res, next){
  var ret = ParamHelpRequest.registerCheck(req, res);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.registerUser(req.body.e_mail, req.body.password, function(result){
    res.json(result);
  });
}


module.exports.registerUser = registerUser;



function home(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.home(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.home = home;

function getAllUnpopulated(req, res, next){
  var ret = ParamHelpRequest.justUser(req, res);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.getAllUnpopulated(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.getAllUnpopulated = getAllUnpopulated;


function getAllPopulated(req, res, next){
  var ret = ParamHelpRequest.justUser(req, res);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.getAllPopulated(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.getAllPopulated = getAllPopulated;

function getAllMin(req, res, next){
  var ret = ParamHelpRequest.justUser(req, res);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.getAllMin(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.getAllMin = getAllMin;

function getAllIds(req, res, next){
  var ret = ParamHelpRequest.justUser(req, res);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  UserMiddle.getAllIds(req.user._id, function(result){
    res.json(result);
  });
}
module.exports.getAllIds=getAllIds;
