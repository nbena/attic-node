import { IDatabase, IMain } from 'pg-promise';
import sqlProvider from '../sql';
import * as TagClass from '../../models/tag';
import User from '../../models/user';

let sql = sqlProvider.tags;

export class Repository {

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }


  changeTitle = (tag: TagClass.Tag,newTitle: string)=>{
    return this.db.none(sql.changeTitle, [tag.userid, tag.title, newTitle]);
  }

  createTag = (tag: TagClass.Tag):Promise<any>=>{
    return this.db.one(sql.createTag, tag.getValues(), (tag:any)=>{return tag.result});
  }

  // removeTag = (tag: TagClass.Tag)=>{
  //   return this.db.result(sql.removeTag, tag.getValues(), (result:any)=>{return result.rowCount});
  // }
  removeTag = (tag: TagClass.Tag)=>{
    return this.db.none(sql.removeTag, tag.getValues());
  }

  //test result.
  selectTagByTitle = (tag: TagClass.Tag)=>{
    return this.db.oneOrNone(sql.selectTagByTitle, tag.getValues(), (tag:any)=>{return tag});
  }

  selectTagsByTitleReg = (user:User, title: string)=>{
    return this.db.any(sql.selectTagsByTitle, [user.userid, title]/*, (rows:any)=>{return rows}*/);
  }

  selectTagsFull = (user:User) =>{
    return this.db.any(sql.selectTagsFull/*, (rows:any)=>{return rows}*/,[user.userid]);
  }

  selectTagsMin = (user:User)=>{
    return this.db.any(sql.selectTagsMin/*, (rows:any)=>{return rows}*/,[user.userid]);
  }

}
