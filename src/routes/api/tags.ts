'use strict';

import * as express from 'express';
const router = express.Router();

import Note from '../../models/note';

import TagEndpoint from '../../endpoints/api/tag_endpoint';

import * as passport from 'passport';
require('../../config/passport')(passport);

let auth = passport.authenticate('jwt', {session:false});
let authLog = passport.authenticate('local', {session:false});



router.post('/mod/changetitle', auth, TagEndpoint.changeTitle);

router.put('/:title', auth, TagEndpoint.createTag);

router.post('/by-title-reg', auth, TagEndpoint.selectTagsByTitleReg);

router.get('/all/min', auth, TagEndpoint.selectAllTagsMin);

// router.get('/all', TagEndpoint.selectTagsFull);

router.post('/all/min', auth, TagEndpoint.selectAllTagsMin);

// router.post('/all', TagEndpoint.selectTagsFull);

router.delete('/:title', auth, TagEndpoint.removeTag);

router.get('/:title', auth,  TagEndpoint.selectTagByTitle);

export default router;
