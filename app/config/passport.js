"use strict";
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local");
const secret_1 = require("./secret");
const db = require("../postgres");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const localLoginOpt = { usernameField: 'userid' };
const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secret_1.default.secret
};
function passportFunc(passport) {
    const localLogin = new LocalStrategy.Strategy(localLoginOpt, (userid, password, done) => {
        db.users.selectByUserId(userid)
            .then(user => {
            let p;
            if (user != null) {
                p = user.checkPassword(password);
            }
            else {
                p = Promise.resolve(false);
            }
            return p;
        })
            .then(result => {
            if (result) {
                return done(null, userid);
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