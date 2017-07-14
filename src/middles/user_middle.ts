import User from '../models/user';
import AuthMiddle from './auth_middle';
import * as db from '../postgres';
import Utils from './useful/utils';

export default class UserMiddle{
  static createUser = (user: User):Promise<any>=>{
    return new Promise((resolve, reject)=>{
      user.hashPassword();
      // .then(hashed=>{
      //   //console.log('hashed');
      //   return db.users.createUser(user);
      // })
      db.users.createUser(user)
      .then(createdUser=>{
          let result:any={
            ok:true,
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
