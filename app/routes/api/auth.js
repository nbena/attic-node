'use strict';
const express = require("express");
const passport = require("passport");
require('../../config/passport')(passport);
const auth_endpoint_1 = require("../../endpoints/auth_endpoint");
const router = express.Router();
let auth = passport.authenticate('jwt', { session: false });
let authLog = passport.authenticate('local', { session: false });
router.post('/login', authLog, auth_endpoint_1.default.authenticate);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=auth.js.map