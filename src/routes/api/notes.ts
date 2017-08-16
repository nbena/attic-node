'use strict';

import * as express from 'express';
const router = express.Router();

import Note from '../../models/note';

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

router.post('/by-tags-no-role/and', auth, NoteEndpoint.selectNotesByTagsNoRoleAnd);

router.post('/by-tags-with-role/and', auth, NoteEndpoint.selectNotesByTagsWithRoleAnd);

router.post('/by-tags-no-role/or', auth, NoteEndpoint.selectNotesByTagsNoRoleOr);

router.post('/by-tags-with-role/or', auth, NoteEndpoint.selectNotesByTagsWithRoleOr);

router.post('/by-tile-reg', auth, validator(Schemas.Notes.NOTES_BY_TITLE_REG_SCHEMA), NoteEndpoint.selectNoteByTitleReg);

router.post('/by-text', auth, validator(Schemas.Notes.NOTES_BY_TEXT_SCHEMA), NoteEndpoint.selectNoteByTextReg);

router.post('/mod/set-done', validator(Schemas.Notes.SET_DONE_SCHEMA),auth, NoteEndpoint.setDone);

router.get('/all/min', auth, NoteEndpoint.selectAllNotesMin);

router.post('/all/min', auth, NoteEndpoint.selectAllNotesMin);

router.get('/all/min/with-date', auth, NoteEndpoint.selectAllNotesMinWithDate);

router.post('/all/min/with-date', auth, NoteEndpoint.selectAllNotesMinWithDate);

router.get('/:title', auth, NoteEndpoint.selectNoteByTitle);

export default router;
