'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const user_endpoint_1 = require("../../endpoints/api/user_endpoint");
const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../../config/passport')(passport);
let auth = passport.authenticate('jwt', { session: false });
router.put('/create', user_endpoint_1.default.createUser);
router.post('/is-available', user_endpoint_1.default.isUserAvailable);
router.get('/is-available', user_endpoint_1.default.isUserAvailable);
router.get('/:userid', auth, user_endpoint_1.default.summary);
router.post('/:userid', auth, user_endpoint_1.default.summary);
exports.default = router;
//# sourceMappingURL=users.js.map