var User = require('../models/UserModel');
// var jwt = require('jwt-simple');
var jwt = require("jsonwebtoken");
var config = require('../config/database');

var AuthController = require('./AuthController');
var Const = require('../public/javascripts/Const');

var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// function createUser(req, res, next){
//   if (!req.body.e_mail || !req.body.password) {
//     res.json({ok: false, msg: 'needing e_mail and password'});
//   } else {
//     var user = new User({
//       e_mail: req.body.e_mail,
//       hashedPassword: req.body.password
//     });
//     // save the user
//     user.save(function(err) {
//       if (err) {
//         return res.json({ok: false, msg: 'user already exists.'});
//       }
//       res.json({ok: true});
//     });
//   }
// }
//
// module.exports.createUser = createUser;






// function authenticate(req, res, next){
//   User.findOne({e_mail: req.body.e_mail})
//     .exec(function(err, user){
//       if(err)return next(err);
//           else if(!user){
//             res.json({ok: false, msg: 'user not found.'});
//           }else{
//             console.log("the user is: ", user);
//             //here ok
//             // check if password matches
//             user.checkPassword(req.body.password, function (err, isMatch){
//               if (isMatch && !err) {
//                 // if user is found and password is right create a token
//                 // var token = jwt.encode(user, config.secret);
//                 var info = user._id;
//                 var token = jwt.sign(info, config.secret, {expiresIn: 10*60});
//                 // return the information including token as JSON
//                 res.json({ok: true, token: 'JWT ' + token});
//               } else {
//                 res.json({ok: false, msg: 'wrong password.'});
//               }
//             });
//           }
//
//     });
// }

function authenticate(req, res, next){
  res.json({ok: true, token: 'JWT '+AuthController.generateToken(req.user)});
}
module.exports.authenticate = authenticate;


function registerUser(req, res, next){
  if(req.body.e_mail && req.body.password){
    User.find({e_mail: req.body.e_mail}, function(err, data){
      if(err)return next(err);
        else{
          if(data.length==0){
            var user = new User({
              e_mail: req.body.e_mail,
              hashedPassword: req.body.password
            });
            user.save(function(err){
              if(err)return next(err);
                else{
                  res.json({ok: true,
                    id: user._id,
                    token: 'JWT '+AuthController.generateToken(user)});
                }
            });
          }else{
            res.json({ok: false, msg: Const.ERR_USER_ALREADY_EXISTS});
          }
        }
    });
  }else{
    res.json({ok: false, msg: Const.ERR_MAIL_PASS_REQUIRED});
  }
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
