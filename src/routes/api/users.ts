'use strict';

import UserEndpoint from '../../endpoints/api/user_endpoint';

import * as express from 'express';
const router = express.Router();


/* GET home page. */
// router.get('/',(req,res,next) => {
//   res.render('index', {title: 'Express'});
// });

router.put('/create', UserEndpoint.createUser);

export default router;
