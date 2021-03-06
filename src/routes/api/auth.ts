'use strict';

import * as express from 'express';

import * as passport from 'passport';
require('../../config/passport')(passport);

import AuthEndpoint from '../../endpoints/auth_endpoint';

const router = express.Router();

import { Schemas } from '../../schemas/index';
const validator = require('../../schemas/auth/index');

let auth = passport.authenticate('jwt', {session:false});
let authLog = passport.authenticate('local', {session:false}); /*used in login*/

/* /api/auth/login */
router.post('/login', validator(Schemas.Auth.LOGIN_SCHEMA), authLog, AuthEndpoint.authenticate);


export default router;
