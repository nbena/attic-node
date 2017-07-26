import {DbError, BasicResult} from './types';
import * as express from 'express';
import User from '../../models/user';
import {PostgresError} from './const';

export default class Utils{

  public static jsonErr=(err: Error):BasicResult=>{
    console.error(err.stack);
    console.log(JSON.stringify(err));
    // if(err.name=='BatchError'){
    //   err = new DbError(err.message);
    // }
    if(err.name=='BatchError' || PostgresError.isPostgresError(err.message)){
      err = new DbError(err.message);
    }
    let msg:string = PostgresError.getCorrectError(err.message);
    let res:BasicResult = new BasicResult(false, err.name+' '+msg);
    return res;
  }

  public static extractUser = (req: express.Request):User=>{
    return new User(req.user.userid);
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
