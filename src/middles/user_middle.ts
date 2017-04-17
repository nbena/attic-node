import User from '../models/user';
import AuthMiddle from './auth_middle';
import * as db from '../postgres';
import Utils from './useful/utils';

export default class UserMiddle{
  static createUser = (user: User):Promise<any>=>{
    return new Promise((resolve, reject)=>{
      db.users.createUser(user)
        .then(user=>{
          let result:any={
            ok:true,
            userId: user.userId,
            token: 'JWT '+AuthMiddle.generateToken(user)
          };
          resolve(result);
         })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
    })
  }

  static removeUser = (user:User):Promise<any>=>{
    return new Promise((resolve, reject)=>{
      db.users.removeUser(user)
      .then(result=>{
        resolve(result);
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }




}
