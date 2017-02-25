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

router.get("/all", function(req, res, next){
  var users = [
    {e_mail: "nicola@bena.it",
    password: "nicolaPassword"},
    {e_mail: "mikkel@bjergso.dk",
    password: "mikkellerPassword"},
    {e_mail: "menno@oliver.nl",
    password: "mennoPassword"},
    {e_mail: "martin@dickie.co.uk",
    password: "dickiePassword"},
    {e_mail: "james@watt.co.uk",
    password: "wattPassword"},
    {e_mail: "omni@pollo.com",
    password: "omniPassword"}
  ]
  res.json(users);
});

module.exports = router;
