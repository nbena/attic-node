import * as Types from './types';
import * as express from 'express';
import User from '../../models/user';

export default class Utils{

  public static jsonErr=(err: Error):Types.BasicResult=>{
    console.error(err.stack);
    console.log(JSON.stringify(err));
    let res:Types.BasicResult = new Types.BasicResult(false, err.name+' '+err.message);
    return res;
  }

  public static extractUser = (req: express.Request):User=>{
    return new User(req.user.userId);
  }
  /*
  key: the name of the obj property,
  value: its value.
  */
  public static jsonCorrect = (obj:any):any=>{
    let objString:string = JSON.stringify(obj,(key, value)=>{
      if(key == 'userid'){
        key = 'userId'
      }
    });
    let objRes:any = JSON.parse(objString);
    return objRes;
  }


}
