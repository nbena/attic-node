var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../../config/passport')(passport);

var AuthController =  require('../../controllers/AuthController');

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login


//api/auth/login
router.post("/login", authLog, AuthController.authenticate);

module.exports = router;
