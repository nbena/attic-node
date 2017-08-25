'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const user_endpoint_1 = require("../../endpoints/api/user_endpoint");
const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../../config/passport')(passport);
let auth = passport.authenticate('jwt', { session: false });
const index_1 = require("../../schemas/index");
const userValidator = require('../../schemas/users/index');
const authValidator = require('../../schemas/auth/index');
router.put('/create', authValidator(index_1.Schemas.Auth.LOGIN_SCHEMA), user_endpoint_1.default.createUser);
router.post('/is-available', userValidator(index_1.Schemas.Users.IS_USER_VALID_SCHEMA), user_endpoint_1.default.isUserAvailable);
router.get('/is-available', userValidator(index_1.Schemas.Users.IS_USER_VALID_SCHEMA), user_endpoint_1.default.isUserAvailable);
router.get('/:userid', auth, user_endpoint_1.default.summary);
router.post('/:userid', auth, user_endpoint_1.default.summary);
exports.default = router;
//# sourceMappingURL=users.js.map