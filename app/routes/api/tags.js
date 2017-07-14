'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const tag_endpoint_1 = require("../../endpoints/api/tag_endpoint");
const passport = require("passport");
require('../../config/passport')(passport);
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/mod/change-title', auth, tag_endpoint_1.default.changeTitle);
router.put('/:title', auth, tag_endpoint_1.default.createTag);
router.post('/by-title-reg', auth, tag_endpoint_1.default.selectTagsByTitleReg);
router.get('/all/min', auth, tag_endpoint_1.default.selectAllTagsMin);
router.post('/all/min', auth, tag_endpoint_1.default.selectAllTagsMin);
router.delete('/:title', auth, tag_endpoint_1.default.removeTag);
router.get('/:title', auth, tag_endpoint_1.default.selectTagByTitle);
router.post('/:title', auth, tag_endpoint_1.default.selectTagByTitle);
exports.default = router;
//# sourceMappingURL=tags.js.map