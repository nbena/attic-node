'use strict';

import UserEndpoint from '../../endpoints/api/user_endpoint';

import * as express from 'express';
const router = express.Router();

import * as passport from 'passport';
require('../../config/passport')(passport);

let auth = passport.authenticate('jwt', {session:false});


/* GET home page. */
// router.get('/',(req,res,next) => {
//   res.render('index', {title: 'Express'});
// });

import { Schemas } from '../../schemas/index';
const userValidator = require('../../schemas/users/index');
const authValidator = require('../../schemas/auth/index');

router.put('/create', authValidator(Schemas.Auth.LOGIN_SCHEMA), UserEndpoint.createUser);

router.post('/is-available', userValidator(Schemas.Users.IS_USER_VALID_SCHEMA), UserEndpoint.isUserAvailable);

router.get('/is-available', userValidator(Schemas.Users.IS_USER_VALID_SCHEMA), UserEndpoint.isUserAvailable);

router.get('/:userid', auth,  UserEndpoint.summary);

router.post('/:userid', auth,  UserEndpoint.summary);


export default router;
