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

router.put('/create', UserEndpoint.createUser);

router.get('/:userid', auth,  UserEndpoint.summary);

router.post('/:userid', auth,  UserEndpoint.summary);

export default router;
