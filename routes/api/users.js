var express = require('express');
var router = express.Router();

var UserController = require("../../controllers/UserController");

var passport = require('passport');
require('../../config/passport')(passport);

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login


router.put("/create", UserController.registerUser);


router.get("/home", auth, UserController.home);

router.post("/home", auth, UserController.home);

router.get("/home/all", auth, UserController.getAllPopulated);

router.post("/home/all", auth, UserController.getAllPopulated);

router.get("/home/all/unpop", auth, UserController.getAllUnpopulated);

router.post("/home/all/unpop", auth, UserController.getAllUnpopulated);

router.get("/home/all/min", auth, UserController.getAllMin);

router.post("/home/all/min", auth, UserController.getAllMin);

router.get("/home/all/ids", auth, UserController.getAllIds);

router.post("/home/all/ids", auth, UserController.getAllIds);

module.exports = router;
