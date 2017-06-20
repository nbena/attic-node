import User from '../../models/user';

import Const from '../../middles/useful/const';
import Utils from '../../middles/useful/utils';
import * as types from '../../middles/useful/types';

import UserMiddle from '../../middles/user_middle';

import * as express from 'express';

class UserEndpointParamCheck {

  public static createUser = (req: express.Request):types.BasicResult=>{
    let result:any = null;
    if(!req.body.userid || !req.body.password){
      result = Utils.jsonErr(new Error(Const.USERNAME_AND_PASSWORD));
    }
    return result;
  }

}

export default class UserEndpoint{

  public static createUser = (req: express.Request, res: express.Response, next) =>{
    let user:User;
    let check = UserEndpointParamCheck.createUser(req);
    if(check!=null){
      res.json(check);
      return;
    }
    user = new User(req.body.userid);
    user.hashedpassword = req.body.password;
    //console.log(JSON.stringify(user));
    UserMiddle.createUser(user)
    .then(result=>{
      res.json(result);
    })
  }

}
