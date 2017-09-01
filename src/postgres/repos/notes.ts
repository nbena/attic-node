import { IDatabase, IMain } from 'pg-promise';
import * as pgp from 'pg-promise';
import sqlProvider from '../sql';
import {Note, NoteExtraMin} from '../../models/note';
import User from '../../models/user';
import {TagExtraMin} from '../../models/tag';
import  {Const} from '../../middles/useful/const';


let sql = sqlProvider.notes;

// class Inserts{
//   _rawDBType: boolean;
//   template: string;
//   data: any[];
//
//   constructor(template:string, data: any[]){
//     // if(!(this instanceof Inserts)){
//     //   return new Inserts(template, data);
//     // }
//     this._rawDBType = true;
//     this.data=data;
//   }
//
//   formatDBType = ()=>{
//     return this.data.map(d=>'('+pgp.as.format(this.template, d)+')').join();
//   };
// }

// private Inserts(template, data) {
//   if (!(this instanceof Inserts)) {
//       return new Inserts(template, data);
//   }
//   this._rawDBType = true;
//   this.formatDBType = function () {
//       return data.map(d=>'(' + pgp.as.format(template, d) + ')').join();
//   };
// }

export class Repository{

  /*can be re-written with a function.*/
  /*private static readonly SELECT_NOTES_BY_TAGS_START =
  'select json_build_object(\'title\', title, \'text\', text,\'isdone\', isDone, \'lastmodificationdate\', lastModificationDate, \'creationDate\', creationDate, \'links\', links) as note from attic.notes join attic.notes_tags as rel on title=noteTitle where rel.userid=\'';*/

  private static readonly SELECT_NOTES_BY_TAGS_START = 'select distinct notetitle as title from attic.notes_tags where attic.notes_tags.userId=\'';
  private static readonly REMOVE_TAGS_FROM_NOTES_START = 'delete from attic.notes_tags where userid=$1 and notetitle=$2 and ';

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }



  private addTagsString(note:NoteExtraMin, tags: TagExtraMin[], roles:string[]):string{
    let things: any[]=[];
    for(let i=0;i<tags.length;i++){
      things.push({
        notetitle: note.title,
        tagtitle: tags[i].title,
        role: roles[i],
        userid: note.userid
      });
    }
    let table = new this.pgp.helpers.TableName('notes_tags', 'attic');
    return this.pgp.helpers.insert(things, ['notetitle', 'tagtitle', 'role', 'userid'], table);
  }


  addTags(note:NoteExtraMin, tags:TagExtraMin[], roles:string[]):Promise<any>{
    if(tags.length!=roles.length){
      throw new Error('mismatch');
    }
    /*must use a transaction here.*/

      // let queries:any[]=[tags.length];
      // for(let i=0;i<tags.length;i++){
      //   let values:any[]=[
      //     note.userid,
      //     note.title,
      //     tags[i].title,
      //     roles[i]
      //   ]
      //   queries.push(t.one(sql.addTags, values, (note:any)=>{note.result}));
      // }

      // let values:any = new Inserts('${noteTitle}, ${tagTitle}, ${role}, ${userid}', things);
      // console.log('the values is: ');
      // console.log(JSON.stringify(values));
      // return t.batch([
      //   t.none('insert into attic.notes_tags(noteTitle, tagTitle, role, userid) values $1 returning noteTitle as result;',
      //     values,
      //     (result:any)=>{return result})
      //   ]);

      return this.db.none(this.addTagsString(note, tags, roles));

  }

  changeDone(note:NoteExtraMin, done: boolean):Promise<any>{
    // let values:any[]=[note.userid, note.title, done];
    //return this.db.oneOrNone(sql.setDone, values, (note:any)=>{return note.result});
    return this.db.none(sql.setDone, (note.getValues() as any[]).concat([done]));
  }

  changeLinks(note: NoteExtraMin, links: string[]):Promise<any>{
    let values:any[]=[note.userid, note.title, JSON.stringify(links)];
    // return this.db.oneOrNone(sql.changeLinks,values, (res:any)=>{return res.result});
    return this.db.none(sql.changeLinks,values);
  }

  changeText(note: NoteExtraMin, newText: string):Promise<any>{
    let values:any[]=[note.userid, note.title, newText];
    // return this.db.oneOrNone(sql.changeText, values, (res:any)=>{
    //   return res.result});
    return this.db.none(sql.changeText, values);
  }

  changeTitle (note:NoteExtraMin, newTitle: string):Promise<any>{
    // let values:any[]=[newTitle, note.title, note.userid];
    // let ps: pgp.PreparedStatement = new pgp.PreparedStatement('change-title', sql.changeTitle, [note.userid, note.title, newTitle]);
    //return this.db.oneOrNone(sql.changeTitle, [note.userid, note.title, newTitle], (res:any)=>{return res.result});
        return this.db.none(sql.changeTitle, [note.userid, note.title, newTitle]);
  }

  /*rewrite a bit, will be done into a transaction..*/
  // createNoteAll(note:Note):Promise<Note>{
  //   let values: any[]=[
  //     note.userid,
  //     note.title,
  //     note.text,
  //     note.isdone,
  //     JSON.stringify(note.links),
  //     note.lastmodificationdate,
  //     note.creationdate
  //   ];
  //
  //   return this.db.one(sql.createNoteWithDateToo, values, (note:any)=>{return note.result});
  // }

  createNote(note: Note):Promise<Note>{
    let values:any[]=[
      note.userid,
      note.title,
      note.text,
      note.isdone,
      JSON.stringify(note.links),
      note.lastmodificationdate,
      note.creationdate
    ];
    //already done in the middle.
    // values.push(((note.isdone == null) ? false : note.isdone));
    // values.push(note.isdone);
    // values.push(JSON.stringify(note.links));


    // console.log('the note:');
    // console.log(JSON.stringify(note));
    //
    // console.log('values are');
    // console.log(values);
    //first action will create the done,
    //the second it will insert the tags.

    let queries:any[]=[];
    let tags:TagExtraMin[]=[];
    let roles:string[]=[];

    if(/*note.maintags !=null && */note.maintags.length !=0){
        note.maintags.forEach(obj=>{
          let tag =  new TagExtraMin(obj)
          roles.push('mainTags');
          tags.push(tag);
        });
    }

    if(/*note.othertags !=null && */note.othertags.length !=0){
        note.othertags.forEach(obj=>{
          let tag =  new TagExtraMin(obj);
          roles.push('otherTags');
          tags.push(tag);
        });
    }

    // console.log('tags:');
    // console.log(JSON.stringify(tags));

    return this.db.tx(t=>{
      queries.push(t.one(sql.createNoteWithDate, values));
      if(tags.length!=0){
        queries.push(t.none(this.addTagsString(note, tags, roles)));
      }
      return t.batch(queries);
    })
  }


  // createNoteWithNoLinks = (note: Note):Promise<Note>=>{
  //   let values: any[]=[
  //     note.userid,
  //     note.title,
  //     note.text,
  //     note.isDone,
  //   ];
  //
  //   return this.db.one(sql.createNoteWithNoLinks, values, (note:any)=>{return note.result});
  // }
  //
  // createNoteWithNoIsDone = (note: Note):Promise<Note>=>{
  //   let values: any[]=[
  //     note.userid,
  //     note.title,
  //     note.text,
  //     JSON.stringify(note.links)
  //   ];
  //
  //   return this.db.one(sql.createNoteWithNoIsDone, values, (note:any)=>{return note.result});
  // }
  //
  // createNoteWithNoLinksNoIsDone = (note: Note):Promise<Note>=>{
  //   let values: any=[
  //     note.userid,
  //     note.title,
  //     note.text,
  //   ];
  //
  //   return this.db.one(sql.createNoteWithNoLinksNoIsDone, values, (note:any)=>{return note.result});
  // }

  // removeNote = (note:Note):Promise<any>=>{
  //   let values:any = note.getValues();
  //   return this.db.one(sql.removeNote, values,(result:any)=>{return result.rowCont});
  // }
  removeNote(note:NoteExtraMin):Promise<any>{
    let values:any = note.getValues();
    return this.db.none(sql.removeNote, values);
  }

  private removeTagsString(length:number):string{
    let base:string = Repository.REMOVE_TAGS_FROM_NOTES_START;
    let things:string[]=[];
    for(let i=0;i<length;i++){
      base+=(' (tagtitle=$'+(i+3)+') or');
    }
    base=base.substr(0, base.length-2);
    return base;
  }

  removeTagsFromNote(note:NoteExtraMin, tags: TagExtraMin[]):Promise<any>{
    // let values: any=note.getValues();
    // return this.db.tx(t=>{
    //   let queries:any[]=[tags.length];
    //   for(let i=0;i<tags.length;i++){
    //     let values:any={
    //       userid:note.userid,
    //       noteTitle:note.title,
    //       tagTitle:tags[i].title
    //     };
    //     queries.push(t.none(sql.removeTagsFromNote, values));
    //   }
    //   return t.batch(queries);
    // });
    return this.db.none(this.removeTagsString(tags.length), [note.userid, note.title].concat(tags.map(obj=>{return obj.title})));
  }

  /*
  select title, text, isDone, creationDate, lastModficationDate, links
  from attic.notes join attic.notes_tags on title=noteTitle
  where attic.notes.userid=$1 and tagTitle=$2;
  */
  // private static getQueryNotesByTagsNoRole(userid: string, tags:TagExtraMin[], and: boolean):string{
  //   let tagsTitle:string[]=tags.map((currentValue:TagExtraMin)=>{
  //     return currentValue.title;
  //   });
  //
  //   let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
  //   query = query.concat(userid+'\'' );
  //   query = query.concat('and ( tagtitle=\'');
  //
  //   /*select ... from ... where userid='ciao' and (tagTitle='*/
  //   let joined:string;
  //   if(and){
  //     joined = tagsTitle.join('\' and tagtitle = \'');
  //   }else{
  //     joined = tagsTitle.join('\' or tagtitle = \'');
  //   }
  //
  //   joined = joined.concat('\');');
  //
  //   /*' or tagTitle='something */
  //
  //   return query.concat(joined);
  // }

  // private static getQueryNotesByTagsWithRole(userid: string, tags:Tag[], roles:string[], and: boolean):string{
  //
  //   let rolesTags:any[]=tags.map((currentValue:Tag, currentIndex: number)=>{
  //     return {role:roles[currentIndex], title: currentValue.title};
  //   });
  //
  //   let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
  //   query = query.concat(userid+'\'' );
  //   query = query.concat('and ');
  //   let joined:string='';
  //   let tmp: string;
  //   for(let obj of rolesTags){
  //     if(and){
  //       tmp = '(tagtitle =\''+obj.title+' and role = \''+obj.role+'\') and';
  //     }else{
  //       tmp = '(tagtitle =\''+obj.title+' and role = \''+obj.role+'\') or';
  //     }
  //     //let tmp:string = '(tagtitle =\''+obj.title+' and role = \''+obj.role+'\') or';
  //     joined = joined.substring(0, joined.lastIndexOf('or'));
  //   }
  //
  //   joined = joined.concat('\);');
  //   query = query.concat(joined);
  //   return query;
  //   //CURRENTLY HAS TO RE WRITTEN TO ESCAPE SQL-INJECTION.
  // }

  // selectNotesByTagsNoRole(userid: string, tags:Tag[], and: boolean):Promise<any>{
  //   let values:string = Repository.getQueryNotesByTagsNoRole(userid,tags, and);
  //   // console.log('the query is:');
  //   // console.log(values);
  //   return this.db.many(values);
  // }
  //
  //
  // selectNotesByTagsWithRole(userid: string, tags:Tag[], roles:string[], and: boolean):Promise<any>{
  //   if(tags.length!=roles.length){
  //     throw new TypeError(Const.ERR_DIFF_LENGTH);
  //   }
  //   let values:string = Repository.getQueryNotesByTagsWithRole(userid, tags, roles, and);
  //   return this.db.many(values);
  // }

  selectNotesMinByTagsAnd(user:User, tags:TagExtraMin[]):Promise<any>{
    return this.db.any(sql.selectNotesMinByTagsAnd, [user.userid, tags.map(obj=>{return obj.title})]);
  }

  selectNotesMinByTagsOr(user:User, tags:TagExtraMin[]):Promise<any>{
    return this.db.any(sql.selectNotesMinByTagsOr, [user.userid].concat(tags.map(obj=>{return obj.title})));
  }

  selectNotesMinWithDateByTagsAnd(user:User, tags:TagExtraMin[]):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDateByTagsAnd, [user.userid, tags.map(obj=>{return obj.title})]);
  }

  selectNotesMinWithDateByTagsOr(user:User, tags:TagExtraMin[]):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDateByTagsOr, [user.userid].concat(tags.map(obj=>{return obj.title})));
  }

  selectNoteByTitle(note:NoteExtraMin):Promise<any>{
    return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note:any)=>{
      return note});
  }

  selectNotesMinByTitleReg(user:User, title:string):Promise<any>{
    return this.db.any(sql.selectNotesMinByTitleReg, [user.userid, '%'+title+'%']);
  }

  selectNotesMinByTextReg(user:User, text:string):Promise<any>{
    return this.db.any(sql.selectNotesMinByTextReg, [user.userid, '%'+text+'%']);
  }

  selectNotesMinWithDateByTextReg(user:User, text:string):Promise<any>{
  return this.db.any(sql.selectNotesMinWithDateByTextReg, [user.userid, '%'+text+'%']);
}

  selectNotesMinWithDateByTitleReg(user:User, title:string):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDateByTitleReg, [user.userid, '%'+title+'%']);
  }

  selectNotesMinWitDateByTextReg(user:User, text:string):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDateByTextReg, [user.userid, '%'+text+'%']);
  }
  //
  // selectNotesFull(user:User):Promise<any>{
  //   return this.db.any(sql.selectNotesFull, [user.userid]);
  // }

  selectNotesMin(user: User):Promise<any>{
    return this.db.any(sql.selectNotesMin,[user.userid]);
  }

  selectNotesMinWithDate(user:User):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDate, [user.userid]);
  }

  selectNotesMinWithDateByIsDone(user:User,isDone:boolean):Promise<any>{
    return this.db.any(sql.selectNotesMinWithDateByIsDone, [user.userid, isDone])
  }

  selectNotesMinByIsDone(user:User,isDone:boolean):Promise<any>{
    return this.db.any(sql.selectNotesMinByIsDone, [user.userid, isDone])
  }



}
