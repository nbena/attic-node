'use strict';

import * as express from 'express';
const router = express.Router();

import Note from '../../models/note';

import NoteEndpoint from '../../endpoints/api/note_endpoint';

import * as passport from 'passport';
require('../../config/passport')(passport);

let auth = passport.authenticate('jwt', {session:false});
let authLog = passport.authenticate('local', {session:false});


router.post('/mod/addtags', auth, NoteEndpoint.addTags);

router.post('/mod/changelinks', auth, NoteEndpoint.changeLinks);

router.post('/mod/changetitle', auth, NoteEndpoint.changeTitle);

router.post('/mod/changetext', auth, NoteEndpoint.changeText);

router.put('/create', auth, NoteEndpoint.createNote);

router.delete('/:title', auth, NoteEndpoint.removeNote);

router.post('/mod/removetags', auth, NoteEndpoint.removeTagsFromNote);

router.post('/by-tags-no-role/and', auth, NoteEndpoint.selectNotesByTagsNoRoleAnd);

router.post('/by-tags-with-role/and', auth, NoteEndpoint.selectNotesByTagsWithRoleAnd);

router.post('/by-tags-no-role/or', auth, NoteEndpoint.selectNotesByTagsNoRoleOr);

router.post('/by-tags-with-role/or', auth, NoteEndpoint.selectNotesByTagsWithRoleOr);

router.post('/by-tile-reg', auth, NoteEndpoint.selectNoteByTitleReg);

router.post('/by-text', auth, NoteEndpoint.selectNoteByTextReg);

router.post('/mod/set-done', auth, NoteEndpoint.setDone);

router.get('/all/min', auth, NoteEndpoint.selectAllNotesMin);

router.post('/all/min', auth, NoteEndpoint.selectAllNotesMin);

router.get('/:title', auth, NoteEndpoint.selectNoteByTitle);

export default router;
