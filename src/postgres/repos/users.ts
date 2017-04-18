import { IDatabase, IMain } from 'pg-promise';
import sqlProvider from '../sql';
import User from '../../models/user';

let sql = sqlProvider.users; /*getting just what we need*/

export class Repository {

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }

  createUser = (user: User):Promise<User>=>{
    return this.db.one(sql.createUser, user.getValues(), (result:any)=>{
      return <User>result.user;
    });
  }

  removeUser = (user: User) =>{
    return this.db.result(sql.removeUser, user.userid, (result:any)=>{result.rowCount});
  }

  selectByUserId = (userid: string):Promise<User>=>{
    return this.db.oneOrNone(sql.selectByUserId, userid, (result:any)=>{
    /*
    I know it's f@@@@@ing ugly but is necessary, if I doesn't
    create a new object I can't obtain the function checkPassword.
    */
      console.log('the result of the select is:');
      console.log(JSON.stringify(result));
      let user:User = new User(result.user.userid);
      user.hashedpassword=result.user.hashedpassword;
      console.log('the user instead is:');
      console.log(JSON.stringify(user));
      return user;
    });
  }


}
