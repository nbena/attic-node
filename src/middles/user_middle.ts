import User from '../models/user';
import AuthMiddle from './auth_middle';
import * as db from '../postgres';
import Utils from './useful/utils';
import {AnyResult, DbError, Result }  from './useful/types';

/*every class returns Promise<Result> because it's the superclass*/

export default class UserMiddle{
  public static createUser (user: User):Promise<Result>{
    return new Promise<Result>((resolve, reject)=>{
      user.hashPassword();
      // .then(hashed=>{
      //   //console.log('hashed');
      //   return db.users.createUser(user);
      // })
      db.users.createUser(user)
      .then(createdUser=>{
          let result:any={
            ok:true,
            result: 'JWT '+AuthMiddle.generateToken(user)
          };
          resolve(result);
         })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
    })
  }


  public static removeUser(user:User):Promise<Result>{
    return new Promise<Result>((resolve, reject)=>{
      db.users.removeUser(user)
      .then(result=>{
        resolve(result);
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }

  public static summary(user:User):Promise<Result>{
    return new Promise<Result>((resolve, reject)=>{
      db.users.summary(user)
      .then(result=>{
        resolve(new AnyResult(true, result));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }


  public static isUserAvailable(user:User):Promise<Result>{
    return new Promise<Result>((resolve, reject)=>{
      db.users.isUserAvailable(user)
      .then(result=>{
        resolve(new AnyResult(true, result));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }




}
