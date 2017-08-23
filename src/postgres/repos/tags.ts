import { IDatabase, IMain } from 'pg-promise';
import sqlProvider from '../sql';
import {Tag, TagAlmostMin, TagExtraMin} from '../../models/tag';
import User from '../../models/user';

let sql = sqlProvider.tags;

export class Repository {

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }


  changeTitle(tag: TagExtraMin,newTitle: string):Promise<any>{
    return this.db.none(sql.changeTitle, [tag.userid, tag.title, newTitle]);
  }

  createTag(tag: TagExtraMin):Promise<any>{
    return this.db.one(sql.createTag, tag.getValues(), (tag:any)=>{return tag.result});
  }

  // removeTag = (tag: Tag)=>{
  //   return this.db.result(sql.removeTag, tag.getValues(), (result:any)=>{return result.rowCount});
  // }
  removeTag(tag: TagExtraMin):Promise<any>{
    return this.db.none(sql.removeTag, tag.getValues());
  }

  //test result.
  selectTagByTitle(tag: TagExtraMin):Promise<any>{
    return this.db.oneOrNone(sql.selectTagByTitle, tag.getValues(), (tag:any)=>{return tag});
  }

  selectTagsAlmostMinByTitleReg(user:User, title: string):Promise<any>{
    return this.db.any(sql.selectTagsByTitle, [user.userid, title]/*, (rows:any)=>{return rows}*/);
  }

  // selectTagsFull(user:User){
  //   return this.db.any(sql.selectTagsFull/*, (rows:any)=>{return rows}*/,[user.userid]);
  // }

  selectTagsAlmostMin(user:User):Promise<any>{
    return this.db.any(sql.selectTagsMin/*, (rows:any)=>{return rows}*/,[user.userid]);
  }

}
