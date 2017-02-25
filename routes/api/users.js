var express = require('express');
var router = express.Router();

var UserController = require("../../controllers/UserController");

var passport = require('passport');
require('../../config/passport')(passport);

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login


router.get("/home", auth, UserController.home);

router.post("/home", auth, UserController.home);


router.post("/create", UserController.registerUser);

module.exports = router;
