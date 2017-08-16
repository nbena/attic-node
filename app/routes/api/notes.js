'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const note_endpoint_1 = require("../../endpoints/api/note_endpoint");
const passport = require("passport");
require('../../config/passport')(passport);
const index_1 = require("../../schemas/index");
const validator = require('../../schemas/notes/index');
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/mod/add-tags', auth, validator(index_1.Schemas.Notes.ADD_TAGS_SCHEMA), note_endpoint_1.default.addTags);
router.post('/mod/change-links', auth, validator(index_1.Schemas.Notes.CHANGE_LINKS_SCHEMA), note_endpoint_1.default.changeLinks);
router.post('/mod/change-title', auth, validator(index_1.Schemas.Notes.CHANGE_TITLE_SCHEMA), note_endpoint_1.default.changeTitle);
router.post('/mod/change-text', auth, validator(index_1.Schemas.Notes.CHANGE_TEXT_SCHEMA), note_endpoint_1.default.changeText);
router.put('/create', auth, validator(index_1.Schemas.Notes.CREATE_NOTE_SCHEMA), note_endpoint_1.default.createNote);
router.delete('/:title', auth, note_endpoint_1.default.removeNote);
router.post('/mod/remove-tags', auth, validator(index_1.Schemas.Notes.REMOVE_TAGS_SCHEMA), note_endpoint_1.default.removeTagsFromNote);
router.post('/by-tags-no-role/and', auth, note_endpoint_1.default.selectNotesByTagsNoRoleAnd);
router.post('/by-tags-with-role/and', auth, note_endpoint_1.default.selectNotesByTagsWithRoleAnd);
router.post('/by-tags-no-role/or', auth, note_endpoint_1.default.selectNotesByTagsNoRoleOr);
router.post('/by-tags-with-role/or', auth, note_endpoint_1.default.selectNotesByTagsWithRoleOr);
router.post('/by-tile-reg', auth, validator(index_1.Schemas.Notes.NOTES_BY_TITLE_REG_SCHEMA), note_endpoint_1.default.selectNoteByTitleReg);
router.post('/by-text', auth, validator(index_1.Schemas.Notes.NOTES_BY_TEXT_SCHEMA), note_endpoint_1.default.selectNoteByTextReg);
router.post('/mod/set-done', validator(index_1.Schemas.Notes.SET_DONE_SCHEMA), auth, note_endpoint_1.default.setDone);
router.get('/all/min', auth, note_endpoint_1.default.selectAllNotesMin);
router.post('/all/min', auth, note_endpoint_1.default.selectAllNotesMin);
router.get('/all/min/with-date', auth, note_endpoint_1.default.selectAllNotesMinWithDate);
router.post('/all/min/with-date', auth, note_endpoint_1.default.selectAllNotesMinWithDate);
router.get('/:title', auth, note_endpoint_1.default.selectNoteByTitle);
exports.default = router;
//# sourceMappingURL=notes.js.map