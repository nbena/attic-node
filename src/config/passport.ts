// import * as JwtStrategy from 'passport-jwt';
// import * as ExtractJwt from 'passport-jwt';
import * as passportJwt from 'passport-jwt';
import * as LocalStrategy from 'passport-local';
import * as passport from 'passport';
import Config from './secret';
import * as db from '../postgres';
import User from '../models/user';

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const localLoginOpt = {usernameField: 'userid'};
const jwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: Config.secret
}


function passportFunc(passport: passport.Passport){
  /*
  the db returns an object of type User.
  */
  const localLogin = new LocalStrategy.Strategy(localLoginOpt,
    (userid: string, password: string, done)=>{
      db.users.selectByUserId(userid)
      .then(user=>{
        let p:Promise<boolean>;
        if(user!=null){
          p=user.checkPassword(password)
        }else{
          p=Promise.resolve(false);
        }
        return p;
      })
        .then(result=>{
          if(result){
            return done(null, userid);
          }else{
            return done(null, false);
          }
        })
      .catch(error=>{
        return done(error);
      });

    });
  // const jwtLogin = new JwtStrategy(jwtOpt, function(payload, done){
  //   console.log("payload on jwt is", payload);
  //   User.findById(payload.id, function(err, user){
  //     if(err){
  //       return done(err, false);
  //     }
  //     if(user){
  //       done(null, user);
  //     }else{
  //       done(null, false);
  //     }
  //   });
  // });
  const jwtLogin = new JwtStrategy(jwtOpt, (payload, done)=>{
    db.users.selectByUserId(<string>payload.userid)
      .then(user=>{
        return done(null, user);
      })
      .catch(error=>{
        return done(error, false);
      })
    //  (err, user)=>{
    //   if(err){
    //     return done(err, false);
    //   }
    //   if(user){
    //     done(null, user);
    //   }else{
    //     done(null, false);
    //   }
    // })
  });

  passport.use(jwtLogin);
  passport.use(localLogin);
}
export = passportFunc;
