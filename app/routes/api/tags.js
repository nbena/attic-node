'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const tag_endpoint_1 = require("../../endpoints/api/tag_endpoint");
const passport = require("passport");
require('../../config/passport')(passport);
const index_1 = require("../../schemas/index");
const validator = require('../../schemas/tags/index');
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/mod/change-title', auth, validator(index_1.Schemas.Tags.CHANGE_TITLE_SCHEMA), tag_endpoint_1.default.changeTitle);
router.put('/:title', auth, tag_endpoint_1.default.createTag);
router.post('/by-title-reg', auth, validator(index_1.Schemas.Tags.TAGS_BY_TITLE_REG_SCHEMA), tag_endpoint_1.default.selectTagsAlmostMinByTitleReg);
router.get('/all/min', auth, tag_endpoint_1.default.selectAllTagsAlmostMin);
router.post('/all/min', auth, tag_endpoint_1.default.selectAllTagsAlmostMin);
router.delete('/:title', auth, tag_endpoint_1.default.removeTag);
router.get('/:title', auth, tag_endpoint_1.default.selectTagByTitle);
router.post('/:title', auth, tag_endpoint_1.default.selectTagByTitle);
exports.default = router;
//# sourceMappingURL=tags.js.map