import { IDatabase, IMain } from 'pg-promise';
import sqlProvider from '../sql';
import User from '../../models/user';
import UserSummary from '../../models/user_summary';

let sql = sqlProvider.users; /*getting just what we need*/

export class Repository {

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }

  createUser (user: User):Promise<User>{
    return this.db.one(sql.createUser, [user.userid, user.hashedpassword], (result:any)=>{
      return result;
    });
  }

  removeUser (user: User){
    return this.db.result(sql.removeUser, user.userid, (result:any)=>{result.rowCount});
  }

  selectByUserId (userid: string):Promise<User>{
    return this.db.oneOrNone(sql.selectByUserId, userid, (result:any)=>{
    /*
    I know it's f@@@@@ing ugly but is necessary, if I doesn't
    create a new object I can't obtain the function checkPassword.
    */
      console.log('the result of the select is:');
      console.log(JSON.stringify(result));
      let user:User = new User(result.user.userid);
      user.hashedpassword=result.user.hashedpassword;
      // console.log('the user instead is:');
      // console.log(JSON.stringify(user));
      return user;
    });
  }

  summary (user: User):Promise<UserSummary>{
    return this.db.one(sql.selectSummary, [user.userid], (result:any)=>{
      return result.get_user_summary;
    })
  }

  isUserAvailable(user:User):Promise<boolean>{
    return this.db.one(sql.isAvailable, [user.userid],(result:any)=>{
      return result.isavailable
    })
  }


}
