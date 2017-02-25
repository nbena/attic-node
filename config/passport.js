var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

var User = require('../models/UserModel');
var config = require('./database');
var passport = require('passport');

const localLoginOpt = {usernameField: 'e_mail'};
const jwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey : config.secret
};

//thaks to
//http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
//its second part is: http://blog.slatepeak.com/build-a-react-redux-app-with-json-web-token-jwt-authentication/
//https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/

//when call require(passport(passport));
// module.exports = function(passport) {
//   var options = {};
//   options.jwtFromRequest = ExtractJwt.fromAuthHeader();
//   options.secretOrKey = config.secret;
//   options.exp = 10;
//   options.ignoreExpiration = false;
//   passport.use(new JwtStrategy(options, function(jwt_payload, done) {
//     // User.findOne({id: jwt.id}, function(err, user) {
//     console.log("strat ", jwt_payload);
//     User.findOne({id:jwt_payload.id}, function(err, user) {
//           if (err) {
//               return done(err, false);
//           }
//           if (user) {
//               done(null, user);
//           } else {
//               done(null, false);
//           }
//       });
//   }));
// };

//the new
module.exports = function(passport){
  const localLogin = new LocalStrategy(localLoginOpt, function(email, password, done){
    User.findOne({e_mail: email}, function(err, user){
      if(err){
        return done(err);
      }if(!user){
        return done(null, false, {error: "user not found"});
      }
      user.checkPassword(password, function(err, isMatch){
        if(err){
          return done(err);
        }if(!isMatch){
          return done(null, false, {error: "wrong pass."});
        }
        return done(null,user);
      });
    });
  });

  const jwtLogin = new JwtStrategy(jwtOpt, function(payload, done){
    // console.log("payload on jwt is", payload);
    User.findById(payload.id, function(err, user){
      if(err){
        return done(err, false);
      }
      if(user){
        done(null, user);
      }else{
        done(null, false);
      }
    });
  });

  passport.use(jwtLogin);
  passport.use(localLogin);

}
