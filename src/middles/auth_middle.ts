import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import Config from '../config/database';
import * as passport from 'passport';
import * as UsefulTypes from './useful/types';

export default class AuthMiddle{

  private static getToken(headers):string{
    let res:string[];
    if(!headers.authorization){
      return null;
    }
    res=headers.authorization.split(' ');
    if(res.length!=2){
      return null;
    }
    return res[1];
  }


public static getUserFromToken(headers):User{
  let token:string = AuthMiddle.getToken(headers);
  if(token==null){
    throw new Error('NO TOKEN');
  }
  let userid:any = jwt.decode(token, Config.secret);
  return new User(userid);
}


public static generateToken(user:User){
  let obj:object = {userid: user.userid};
  return jwt.sign(
    obj
  , Config.secret);
}


public static authenticate(user:User):Promise<UsefulTypes.AuthResult>{
  return new Promise((resolve, reject)=>{
    let result:UsefulTypes.AuthResult = new UsefulTypes.AuthResult();
    result.ok=true;
    result.result='JWT '+AuthMiddle.generateToken(user);
    resolve(result);
  });
}


}
