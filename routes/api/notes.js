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


//==================== NOTES ======================================
//=================================================================

router.get("/all",auth,  NoteController.allNotesPopulated);

router.post("/all", auth, NoteController.allNotesPopulated);

router.get("/all/unpop", auth, NoteController.allNotesUnpopulated);

router.post("/all/unpop", auth, NoteController.allNotesUnpopulated);

router.post("/by-title/", auth, NoteController.noteByTitlePopulated);

router.post("/by-title/unpop", auth, NoteController.noteByTitleUnpopulated);

router.post("/by-title/reg", auth,  NoteController.noteByTitleRegexPopulated);

router.post("/by-title/reg/unpop", auth, NoteController.noteByTitleRegexUnpopulated);


/*
Require:
{"text":"text-to-search"}
Return a JSON array with the notes that have text
that matches that param 'text'
*/
router.post("/by-text/", auth, NoteController.noteByTextPopulated);

/*
Require:
{"text":"text-to-search"}
Return a JSON array with the notes that have text
that matches that param 'text'
*/
router.post("/by-text/unpop", auth, NoteController.noteByTextUnpopulated);





/*
Return a JSON object (note) with an id same as the id
passed
Population is done.
*/
router.post("/by-id", auth, NoteController.noteByIdPopulated);


/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into mainTags
and otherTags
*/
router.post("/by-tag", auth,  NoteController.notesByTagPopulated);

/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into mainTags
*/
// router.post("/by-main-tag", auth, NoteController.notesByMainTagPopulated);

/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into otherTags
*/
// router.post("/by-other-tag", auth, NoteController.notesByOthersTagPopulated);




/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into mainTags
and otherTags
*/
router.post("/by-tag/unpop", auth,  NoteController.notesByTagUnpopulated);

/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into mainTags
*/
// router.post("/by-main-tag/unpop", auth, NoteController.notesByMainTagUnpopulated);

/*
Require:
1) ["id1", "id2"] or either:
2) [{"_id": "id",
          "title": "title",
          "_userId": "userId",
          "__v": 0,
          "notes": ["5898892b235e362230eb1305"]
        }]
It searches for the given objects/ids into otherTags
*/
// router.post("/by-other-tag/unpop", auth, NoteController.notesByOthersTagUnpopulated);




router.put("/create", auth, NoteController.createNote);

router.post("/mod/addtags", auth, NoteController.addTags);

router.post("/mod/addrefs", auth, NoteController.addRefs);

router.post("/mod/removerefs", auth, NoteController.removeRefs);

router.post("/mod/removetags", auth, NoteController.removeTags);

router.post("/mod/setdone", auth, NoteController.setDone);

router.post("/mod/text", auth, NoteController.updateText);

router.delete("/all", auth, NoteController.removeAllNotes);

router.delete("/clean", auth, NoteController.cleanNotes);



// router.delete("/api/notes/by-id", auth, NoteController.removeNote);

router.get("/count", auth, NoteController.countNotes);

router.post("/count", auth, NoteController.countNotes);

router.get("/all/min", auth, NoteController.allNotesMin);

router.post("/all/min", auth, NoteController.allNotesMin);



/*
Return a JSON object (note) with an id same as the id
passed
Population is done.
*/

router.get("/:id", auth, NoteController.noteByIdPopulated);

router.delete("/:id", auth, NoteController.removeNote);



module.exports = router;
