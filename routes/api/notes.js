var express = require('express');
var router = express.Router();

var NoteModel = require("../../models/NoteModel.js");
var TagModel = require("../../models/TagModel.js");
var UserModel = require("../../models/UserModel.js");

var NoteController = require("../../controllers/NoteController");
var TagController = require("../../controllers/TagController");
var UserController = require("../../controllers/UserController");

var Utils = require('../../public/javascripts/Utils');

var passport = require('passport');
require('../../config/passport')(passport);

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login


//==================== NOTES ======================================
//=================================================================

router.get("/all",auth,  NoteController.allNotesPopulated);

router.post("/all", auth, NoteController.allNotesPopulated);

router.get("/all/unpop", auth, NoteController.allNotesUnpopulated);

router.post("/all/unpop", auth, NoteController.allNotesUnpopulated);

router.post("/by-title/", auth, NoteController.notesByTitlePopulated);

router.post("/by-title/unpop", auth, NoteController.notesByTitleUnpopulated);

router.post("/by-title/reg", auth,  NoteController.notesByTitleRegexPopulated);

router.post("/by-title/reg/unpop", auth, NoteController.notesByTitleRegexUnpopulated);


/*
Require:
{"text":"text-to-search"}
Return a JSON array with the notes that have text
that matches that param 'text'
*/
router.post("/by-text/", auth, NoteController.notesByTextPopulated);

/*
Require:
{"text":"text-to-search"}
Return a JSON array with the notes that have text
that matches that param 'text'
*/
router.post("/by-text/unpop", auth, NoteController.notesByTextUnpopulated);


/*
Return a JSON object (note) with an id same as the id
passed
Population is done.
*/



router.post("/by-tag/unpop", auth,  NoteController.notesByTagUnpopulated);


router.put("/create", auth, NoteController.createNote);

router.post("/mod/addtags", auth, NoteController.addTags);

router.post("/mod/addlinks", auth, NoteController.addLinks);

router.post("/mod/removerefs", auth, NoteController.removeLinks);

router.post("/mod/removetags", auth, NoteController.removeTags);

router.post("/mod/setdone", auth, NoteController.setDone);

router.post("/mod/text", auth, NoteController.updateText);

router.post('/mod/title', auth, NoteController.updateTitle);

router.delete("/all", auth, NoteController.removeAllNotes);

router.delete("/clean", auth, NoteController.cleanNotes);



// router.delete("/api/notes/by-id", auth, NoteController.removeNote);

router.get("/count", auth, NoteController.countNotes);

router.post("/count", auth, NoteController.countNotes);

router.get("/all/min", auth, NoteController.allNotesMin);

router.post("/all/min", auth, NoteController.allNotesMin);

router.get("/all/ids", auth, NoteController.allNotesIds);

router.post("/all/ids", auth, NoteController.allNotesIds);



/*
Return a JSON object (note) with an id same as the id
passed
Population is done.
*/
router.post("/by-id", auth, NoteController.noteByIdPopulated);

router.get("/:id", auth, NoteController.noteByIdPopulated);

router.delete("/:id", auth, NoteController.removeNote);


module.exports = router;
