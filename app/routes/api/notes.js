'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const note_endpoint_1 = require("../../endpoints/api/note_endpoint");
const passport = require("passport");
require('../../config/passport')(passport);
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/mod/add-tags', auth, note_endpoint_1.default.addTags);
router.post('/mod/change-links', auth, note_endpoint_1.default.changeLinks);
router.post('/mod/change-title', auth, note_endpoint_1.default.changeTitle);
router.post('/mod/change-text', auth, note_endpoint_1.default.changeText);
router.put('/create', auth, note_endpoint_1.default.createNote);
router.delete('/:title', auth, note_endpoint_1.default.removeNote);
router.post('/mod/remove-tags', auth, note_endpoint_1.default.removeTagsFromNote);
router.post('/by-tags-no-role/and', auth, note_endpoint_1.default.selectNotesByTagsNoRoleAnd);
router.post('/by-tags-with-role/and', auth, note_endpoint_1.default.selectNotesByTagsWithRoleAnd);
router.post('/by-tags-no-role/or', auth, note_endpoint_1.default.selectNotesByTagsNoRoleOr);
router.post('/by-tags-with-role/or', auth, note_endpoint_1.default.selectNotesByTagsWithRoleOr);
router.post('/by-tile-reg', auth, note_endpoint_1.default.selectNoteByTitleReg);
router.post('/by-text', auth, note_endpoint_1.default.selectNoteByTextReg);
router.post('/mod/set-done', auth, note_endpoint_1.default.setDone);
router.get('/all/min', auth, note_endpoint_1.default.selectAllNotesMin);
router.post('/all/min', auth, note_endpoint_1.default.selectAllNotesMin);
router.get('/all/min/with-date', auth, note_endpoint_1.default.selectAllNotesMinWithDate);
router.post('/all/min/with-date', auth, note_endpoint_1.default.selectAllNotesMinWithDate);
router.get('/:title', auth, note_endpoint_1.default.selectNoteByTitle);
exports.default = router;
//# sourceMappingURL=notes.js.map