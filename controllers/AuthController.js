var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');
var passport= require('passport');

function getToken(headers) {
  if (headers && headers.authorization) {
    var passed = headers.authorization.split(' ');
    /*split because is: 'JWT token'*/
    if (passed.length === 2) {
      return passed[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
  // return headers.authorization;
};
module.exports.getToken = getToken;

/*
{ user:
   { _id: '5898892b235e362230eb12f6',
     e_mail: 'nicola@bena.it',
     hashedPassword: '$2a$10$5K.nQdoI8DeL1ckNsbyjuekAru9KYZI3TG/c9pM8KN9WE/G7nvmCG',
     __v: 0 } }
*/
function getUserFromToken(headers){
  var token = getToken(headers);
  var result = {};
  if(token){
    var user = jwt.decode(token, config.secret);
    // console.log(user);
    result = {user: user};
  }else{
    result = {ok: false, msg: "no token"};
  }
  return result;
};

module.exports.getUserFromToken = getUserFromToken;


function generateToken(user){
  // console.log("user is", user);
  return jwt.sign({id: user._id}, config.secret, { //important: leave id: user._id
    expiresIn: 60*24*60
  });
}

module.exports.generateToken = generateToken;

function authenticate(req, res, next){
  res.json({ok: true, token: 'JWT '+generateToken(req.user)});
}
module.exports.authenticate = authenticate;
