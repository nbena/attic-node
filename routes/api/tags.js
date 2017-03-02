var express = require('express');
var router = express.Router();

var NoteModel = require("../../models/NoteModel.js");
var TagModel = require("../../models/TagModel.js");
var UserModel = require("../../models/UserModel.js");

var NoteController = require("../../controllers/NoteController");
var TagController = require("../../controllers/TagController");
var UserController = require("../../controllers/UserController");

var passport = require('passport');
require('../../config/passport')(passport);

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login

router.put("/:title", auth, TagController.createTag);

router.post("/all", auth, TagController.allTagsPopulated);

router.get("/all", auth, TagController.allTagsPopulated);

router.delete("/all", auth, TagController.deleteAllTags);

router.post("/all/unpop", auth, TagController.allTagsUnpopulated);

router.get("/all/unpop", auth, TagController.allTagsUnpopulated);


router.get("/all/min", auth, TagController.allTagsMin);

router.post("/all/min", auth, TagController.allTagsMin);

router.get("/all/ids", auth, TagController.allTagsIds);

router.post("/all/ids", auth, TagController.allTagsIds);


router.post("/by-title/reg",auth, TagController.tagByTitlePopulated);

// router.delete("/by-title/reg", auth, TagController.deleteTagsByTitleRegex);


router.post("/by-title/reg/unpop", auth,TagController.tagByTitleUnpopulated);



// router.delete("/delete-by-ids", auth, TagController.deleteTagsById);

router.get("/count", auth, TagController.countTags);

router.post("/count", auth, TagController.countTags);


router.get("/most-used", auth, TagController.mostUsed);

router.post("/most-used", auth, TagController.mostUsed);


router.post("/by-id", auth, TagController.tagById);

router.delete("/:id", auth, TagController.deleteTagById);

router.get("/:id", auth, TagController.tagById);

module.exports = router;
