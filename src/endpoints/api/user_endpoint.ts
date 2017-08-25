import User from '../../models/user';

import {Const} from '../../middles/useful/const';
import Utils from '../../middles/useful/utils';
import {AnyResult, BasicResult, JsonError } from '../../middles/useful/types';

import UserMiddle from '../../middles/user_middle';

import * as express from 'express';
/*
class UserEndpointParamCheck {

  public static createUser(req: express.Request):BasicResult{
    let result:any = null;
    if(!req.body.userid || !req.body.password){
      result = Utils.jsonErr(new JsonError(Const.USERNAME_AND_PASSWORD));
    }
    return result;
  }


  //I know that it's not necessay but I want to.
  public static summary(req: express.Request):BasicResult{
    let result:any = null;
    if(!req.params.userid){
      result = Utils.jsonErr(new JsonError(Const.USERID_REQUIRED));
    }
    return result;
  }

  public static isUserAvailable(req:express.Request):BasicResult{
    let result:any = null;
    if(!req.body.userid){
      result = Utils.jsonErr(new JsonError(Const.USERID_REQUIRED));
    }
    return result;
  }

}
*/

export default class UserEndpoint{

  public static createUser(req: express.Request, res: express.Response, next){
    let user:User;
    // let check = UserEndpointParamCheck.createUser(req);
    // if(check!=null){
    //   res.json(check);
    //   return;
    // }
    user = new User(req.body.userid);
    user.hashedpassword = req.body.password;
    //console.log(JSON.stringify(user));
    UserMiddle.createUser(user)
    .then(result=>{
      res.json(result);
    })
  }


  public static summary(req: express.Request, res: express.Response, next){
    let user:User;
    // let check = UserEndpointParamCheck.summary(req);
    // if(check!=null){
    //   res.json(check);
    //   return;
    // }
    user = Utils.extractUser(req);
    if(user.userid!=req.params.userid){
      res.json(Utils.jsonErr(new Error(Const.USER_MISMATCH)));
      return;
    }
    UserMiddle.summary(user)
    .then(result=>{
      res.json(result);
    })
  }


  /**
  Check if a user is available, it does not require authentication.
  */
  public static isUserAvailable(req:express.Request, res:express.Response, next){
    let user:User;
    // let check = UserEndpointParamCheck.isUserAvailable(req);
    // if(check!=null){
    //   res.json(check);
    //   return;
    // }
    user = new User(req.body.userid);
    UserMiddle.isUserAvailable(user)
    .then(result=>{
      res.json(result);
    })
  }

}
