import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as express from 'express';
import AuthMiddle from '../middles/auth_middle';
import {Const}  from '../middles/useful/const';
import * as types from '../middles/useful/types';
import Utils from '../middles/useful/utils';

/*
Even if not necessary I prefer to use BasicResult, so I clearify what I'm doing.
*/

export default class AuthEndpoint{
  public static authenticate(req: express.Request, res: express.Response, next){
    if(!req.user || req.user==null){
      res.json(new types.BasicResult(false, Const.ERR_USER));
    }
    /*
    f@@@ing important: req.user contains a string: the userId.
    */

    AuthMiddle.authenticate(new User(req.user))
      .then(result=>{
        res.json(result);
      })
      .catch(error=>{
        res.json(Utils.jsonErr(error));
      })
  }
}
