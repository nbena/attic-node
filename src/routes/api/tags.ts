'use strict';

import * as express from 'express';
const router = express.Router();

import Note from '../../models/note';

import TagEndpoint from '../../endpoints/api/tag_endpoint';

import * as passport from 'passport';
require('../../config/passport')(passport);

import { Schemas } from '../../schemas/index';
const validator = require('../../schemas/tags/index');

let auth = passport.authenticate('jwt', {session:false});
let authLog = passport.authenticate('local', {session:false});



router.post('/mod/change-title', auth, validator(Schemas.Tags.CHANGE_TITLE_SCHEMA), TagEndpoint.changeTitle);

router.put('/:title', auth, TagEndpoint.createTag);

router.post('/by-title-reg', auth, validator(Schemas.Tags.TAGS_BY_TITLE_REG_SCHEMA),TagEndpoint.selectTagsByTitleReg);

router.get('/all/min', auth, TagEndpoint.selectAllTagsMin);

// router.get('/all', TagEndpoint.selectTagsFull);

router.post('/all/min', auth, TagEndpoint.selectAllTagsMin);

// router.post('/all', TagEndpoint.selectTagsFull);

router.delete('/:title', auth, TagEndpoint.removeTag);

router.get('/:title', auth,  TagEndpoint.selectTagByTitle);

router.post('/:title', auth, TagEndpoint.selectTagByTitle);

export default router;
