// var User = require('../models/UserModel');
// /* var jwt = require('jwt-simple');*/
// var jwt = require("jsonwebtoken");
// var config = require('../config/database');





/*
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
*/



// function createToken(req){
//   var result;
//   User.findOne({e_mail: req.body.e_mail})
//     .exec(function(err, user){
//       if(err)return next(err);
//           else if(!user){
//             result={ok: false, msg: 'user not found.'};
//           }else{
//             //here ok
//             // check if password matches
//             user.checkPassword(req.body.password, function (err, isMatch){
//               if (isMatch && !err) {
//                 // if user is found and password is right create a token
//                 var token = jwt.encode(user, config.secret);
//                 // return the information including token as JSON
//                 result={ok: true, token: 'JWT ' + token};
//               } else {
//                 result={ok: false, msg: 'Authentication failed. Wrong password.'};
//               }
//             });
//           }
//     });
//     return result;
// }


// apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     var decoded = jwt.decode(token, config.secret);
//     User.findOne({
//       name: decoded.name
//     }, function(err, user) {
//         if (err) throw err;
//
//         if (!user) {
//           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
//         } else {
//           res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
//         }
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'No token provided.'});
//   }
// });

// function getUserIdIfAuthenticated(headers){
//   var token = getToken(headers);
//   var user = null;
//   var result = {};
//   if(token){
//     var decToken = jwt.decode(token, config.secret);
//     user = decToken;
//     console.log(user);
//     User.findOne({e_mail: user.e_mail}, function(err, data){
//       if(err) return {error: err};
//       else{
//         if(!data){
//           return {error: "no user found"};
//         }else {
//           console.log("data ",data);
//           return {id:data._id};
//         }
//       }
//     });
//     }
//     else{
//       return {error: "no token"};
//     }
// };
//
// module.exports.getUserIdIfAuthenticated = getUserIdIfAuthenticated;

// function getUserFromToken(headers){
//   var token = getToken(headers);
//   var result = {};
//   if(token){
//     var user = token.jwt.decode(token, config.secret);
//     result = {user: user};
//   }else{
//     result = {ok: false, msg: "no token"};
//   }
//   return result;
// };
//
// module.exports.getUserFromToken = getUserFromToken;
//
//
// function getToken(headers) {
//   if (headers && headers.authorization) {
//     var passed = headers.authorization.split(' ');
//     /*split because is: 'JWT token'*/
//     if (passed.length === 2) {
//       return passed[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
//   // return headers.authorization;
// };
//
// module.exports.getToken = getToken;
