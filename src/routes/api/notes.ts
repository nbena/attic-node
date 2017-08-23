'use strict';

import * as express from 'express';
const router = express.Router();

//import Note from '../../models/note';

import NoteEndpoint from '../../endpoints/api/note_endpoint';

import * as passport from 'passport';
require('../../config/passport')(passport);

//import * as validator from '../../schemas/notes/index';
import { Schemas } from '../../schemas/index';
const validator = require('../../schemas/notes/index');

let auth = passport.authenticate('jwt', {session:false});
let authLog = passport.authenticate('local', {session:false});


router.post('/mod/add-tags', auth, validator(Schemas.Notes.ADD_TAGS_SCHEMA), NoteEndpoint.addTags);

router.post('/mod/change-links', auth,validator(Schemas.Notes.CHANGE_LINKS_SCHEMA), NoteEndpoint.changeLinks);

router.post('/mod/change-title', auth, validator(Schemas.Notes.CHANGE_TITLE_SCHEMA),NoteEndpoint.changeTitle);

router.post('/mod/change-text', auth, validator(Schemas.Notes.CHANGE_TEXT_SCHEMA), NoteEndpoint.changeText);

router.put('/create', auth, validator(Schemas.Notes.CREATE_NOTE_SCHEMA), NoteEndpoint.createNote);

router.delete('/:title', auth, NoteEndpoint.removeNote);

router.post('/mod/remove-tags', auth, validator(Schemas.Notes.REMOVE_TAGS_SCHEMA), NoteEndpoint.removeTagsFromNote);

// router.post('/by-tags-no-role/and', auth, NoteEndpoint.selectNotesByTagsNoRoleAnd);
//
// router.post('/by-tags-with-role/and', auth, NoteEndpoint.selectNotesByTagsWithRoleAnd);
//
// router.post('/by-tags-no-role/or', auth, NoteEndpoint.selectNotesByTagsNoRoleOr);
//
// router.post('/by-tags-with-role/or', auth, NoteEndpoint.selectNotesByTagsWithRoleOr);

router.post('/by-tags/and/with-date', auth, validator(Schemas.Notes.NOTES_BY_TAGS_SCHEMA),NoteEndpoint.selectNotesMinWithDateByTagsAnd);

router.post('/by-tags/and', auth, validator(Schemas.Notes.NOTES_BY_TAGS_SCHEMA),NoteEndpoint.selectNotesMinByTagsAnd);

router.post('/by-tags/or/with-date', auth, validator(Schemas.Notes.NOTES_BY_TAGS_SCHEMA),NoteEndpoint.selectNotesMinWithDateByTagsOr);

router.post('/by-tags/or', auth, validator(Schemas.Notes.NOTES_BY_TAGS_SCHEMA),NoteEndpoint.selectNotesMinByTagsOr);

router.post('/by-tile-reg', auth, validator(Schemas.Notes.NOTES_BY_TITLE_REG_SCHEMA), NoteEndpoint.selectNotesMinByTitleReg);

router.post('/by-text', auth, validator(Schemas.Notes.NOTES_BY_TEXT_SCHEMA), NoteEndpoint.selectNotesMinByTextReg);

router.post('/by-tile-reg/with-date', auth, validator(Schemas.Notes.NOTES_BY_TITLE_REG_SCHEMA), NoteEndpoint.selectNotesMinWithDateByTitleReg);

router.post('/by-text/with-date', auth, validator(Schemas.Notes.NOTES_BY_TEXT_SCHEMA), NoteEndpoint.selectNotesMinWithDateByTextReg);

router.post('/by-isdone', auth, validator(Schemas.Notes.NOTES_BY_ISDONE_SCHEMA), NoteEndpoint.selectNotesMinByIsDone);

router.post('/by-isdone/with-date', auth, validator(Schemas.Notes.NOTES_BY_ISDONE_SCHEMA), NoteEndpoint.selectNotesMinWithDateByIsDone);

router.post('/mod/set-done', validator(Schemas.Notes.SET_DONE_SCHEMA),auth, NoteEndpoint.changeDone);

router.get('/all/min', auth, NoteEndpoint.selectNotesMin);

router.post('/all/min', auth, NoteEndpoint.selectNotesMin);

router.get('/all/min/with-date', auth, NoteEndpoint.selectNotesMinWithDate);

router.post('/all/min/with-date', auth, NoteEndpoint.selectNotesMinWithDate);

router.get('/:title', auth, NoteEndpoint.selectNoteByTitle);

export default router;
