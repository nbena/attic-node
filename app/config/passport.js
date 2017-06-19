"use strict";
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local");
const database_1 = require("./database");
const db = require("../postgres");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const localLoginOpt = { usernameField: 'userid' };
const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: database_1.default.secret
};
function passportFunc(passport) {
    const localLogin = new LocalStrategy.Strategy(localLoginOpt, (userId, password, done) => {
        db.users.selectByUserId(userId)
            .then(user => {
            console.log('the password passed by param is');
            console.log(password);
            console.log('the user:');
            console.log(user.hashedpassword);
            return user.checkPassword(password);
        })
            .then(result => {
            console.log('result is: ');
            console.log(result);
            if (result) {
                return done(null, userId);
            }
            else {
                return done(null, false);
            }
        })
            .catch(error => {
            return done(error);
        });
    });
    const jwtLogin = new JwtStrategy(jwtOpt, (payload, done) => {
        db.users.selectByUserId(payload.userid)
            .then(user => {
            return done(null, user);
        })
            .catch(error => {
            return done(error, false);
        });
    });
    passport.use(jwtLogin);
    passport.use(localLogin);
}
module.exports = passportFunc;
//# sourceMappingURL=passport.js.map