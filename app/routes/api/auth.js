'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
require('../../config/passport')(passport);
const auth_endpoint_1 = require("../../endpoints/auth_endpoint");
const router = express.Router();
const index_1 = require("../../schemas/index");
const validator = require('../../schemas/auth/index');
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/login', validator(index_1.Schemas.Auth.LOGIN_SCHEMA), authLog, auth_endpoint_1.default.authenticate);
exports.default = router;
//# sourceMappingURL=auth.js.map