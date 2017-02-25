var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var NoteModel = require("../models/NoteModel.js");
var TagModel = require("../models/TagModel.js");
var UserModel = require("../models/UserModel.js");

var NoteController = require("../controllers/NoteController");
var TagController = require("../controllers/TagController");
var UserController = require("../controllers/UserController");

var passport = require('passport');
require('../config/passport')(passport);

//stateless jwt, all is inside the token
var auth = passport.authenticate('jwt', { session: false});
var authLog = passport.authenticate('local', {session: false}); //just when /auth/login

//prefer to have more API with simple requests.

//to simplify--> all tags and note are populated by default.
//specific API just for listing will be definited next.
//operations with no populations end with /unpop

//remember than an empty array is returned if data aren't found

//remember to set the content-type to json, if not data will be not
//interpreted correctly.

//==========================API=====================================
//
// user is never populated
// population is done by default, /unpop if unwanted



// //==================== NOTES ======================================
// //=================================================================
//
// router.get("/api/notes/all",auth,  NoteController.allNotesPopulated);
//
// router.post("/api/notes/all", auth, NoteController.allNotesPopulated);
//
// router.get("/api/notes/all/unpop", auth, NoteController.allNotesUnpopulated);
//
// router.post("/api/notes/all/unpop", auth, NoteController.allNotesUnpopulated);
//
// router.post("/api/notes/by-title/", auth, NoteController.noteByTitlePopulated);
//
// router.post("/api/notes/by-title/unpop", auth, NoteController.noteByTitleUnpopulated);
//
// router.post("/api/notes/by-title/reg", auth,  NoteController.noteByTitleRegexPopulated);
//
// router.post("/api/notes/by-title/reg/unpop", auth, NoteController.noteByTitleRegexUnpopulated);
//
//
// /*
// Require:
// {"text":"text-to-search"}
// Return a JSON array with the notes that have text
// that matches that param 'text'
// */
// router.post("/api/notes/by-text/", auth, NoteController.noteByTextPopulated);
//
// /*
// Require:
// {"text":"text-to-search"}
// Return a JSON array with the notes that have text
// that matches that param 'text'
// */
// router.post("/api/notes/by-text/unpop", auth, NoteController.noteByTextUnpopulated);
//
//
//
//
// /*
// Return a JSON object (note) with an id same as the id
// passed
// Population is done.
// */
//
// router.get("/api/notes/:id", auth, NoteController.noteByIdPopulated);
// /*
// Return a JSON object (note) with an id same as the id
// passed
// Population is done.
// */
// router.post("/api/notes/by-id", auth, NoteController.noteByIdPopulated);
//
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into mainTags
// and otherTags
// */
// router.post("/api/notes/by-tag", auth,  NoteController.notesByTagPopulated);
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into mainTags
// */
// router.post("/api/notes/by-main-tag", auth, NoteController.notesByMainTagPopulated);
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into otherTags
// */
// router.post("/api/notes/by-other-tag", auth, NoteController.notesByOthersTagPopulated);
//
//
//
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into mainTags
// and otherTags
// */
// router.post("/api/notes/by-tag/unpop", auth,  NoteController.notesByTagUnpopulated);
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into mainTags
// */
// router.post("/api/notes/by-main-tag/unpop", auth, NoteController.notesByMainTagUnpopulated);
//
// /*
// Require:
// 1) ["id1", "id2"] or either:
// 2) [{"_id": "id",
//           "title": "title",
//           "_userId": "userId",
//           "__v": 0,
//           "notes": ["5898892b235e362230eb1305"]
//         }]
// It searches for the given objects/ids into otherTags
// */
// router.post("/api/notes/by-other-tag/unpop", auth, NoteController.notesByOthersTagUnpopulated);
//
//
//
//
// router.put("/api/notes/create", auth, NoteController.createNote);
//
// router.put("/api/notes/mod/removetags", auth, NoteController.removeTags);
//
// router.delete("/api/notes/:id", auth, NoteController.removeNote);
//
// // router.delete("/api/notes/by-id", auth, NoteController.removeNote);
//
// router.delete("/api/notes/all", auth, NoteController.removeAllNotes);



router.get("/api", function(req, res, next){
  res.render("api");
});



// router.put("/api/tags/:title", auth, TagController.createTag);
//
//
// router.post("/api/tags/all", auth, TagController.allTagsPopulated);
//
// router.get("/api/tags/all", auth, TagController.allTagsPopulated);
//
// router.delete("/api/tags/all", auth, TagController.deleteAllTags);
//
// router.post("/api/tags/all/unpop", auth, TagController.allTagsUnpopulated);
//
//
// router.get("/api/tags/all/unpop", auth, TagController.allTagsUnpopulated);
//
//
// router.post("/api/tags/by-title/reg",auth, TagController.tagByTitlePopulated);
//
// router.delete("/api/tags/by-title/reg", auth, TagController.deleteTagsByTitleRegex);
//
// router.delete("/api/tags/by-title", auth, TagController.deleteOneTagByTitle);
//
// router.post("/api/tags/by-title/reg/unpop", auth,TagController.tagByTitleUnpopulated);
//
// router.delete("api/tags/by-id", auth, TagController.deleteTagById);
//
// router.post("/api/tags/by-id", auth, TagController.tagById);
//
// router.delete("/api/tags/:id", auth, TagController.deleteTagById);
//
// router.get("/api/tags/:id", auth, TagController.tagById);
//
// router.delete("/api/tags/delete-by-ids", auth, TagController.deleteTagsById);



router.post("/api/auth/login", authLog, UserController.authenticate);

router.post("/api/auth/create", UserController.registerUser);




// router.post("/api/auth/logout", UserController.logout);

module.exports = router;
