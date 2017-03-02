var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');
var passport= require('passport');
var Const = require('../public/javascripts/Const');

var AuthMiddle = require('../middle/AuthMiddle');

function authenticate(req, res, next){
  if(!req.user){
    res.json({ok: false, msg: Const.ERR_USER});
  }
  AuthMiddle.authenticate(req.user, function(result){
    res.json(result);
  });
}
module.exports.authenticate=authenticate;
