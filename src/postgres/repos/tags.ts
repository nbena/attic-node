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
    return this.db.one(sql.changeTitle, [tag.userId, tag.title, newTitle], (tag: any)=>{return tag.result});
  }

  createTag = (tag: TagClass.Tag)=>{
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
    return this.db.any(sql.selectTagsByTitle, [user.userId, title]/*, (rows:any)=>{return rows}*/);
  }

  selectTagsFull = (user:User) =>{
    return this.db.any(sql.selectTagsFull/*, (rows:any)=>{return rows}*/,[user.userId]);
  }

  selectTagsMin = (user:User)=>{
    return this.db.any(sql.selectTagsMin/*, (rows:any)=>{return rows}*/,[user.userId]);
  }

}
