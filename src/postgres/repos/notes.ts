import { IDatabase, IMain } from 'pg-promise';
import sqlProvider from '../sql';
import Note from '../../models/note';
import User from '../../models/user';
import * as TagClass from '../../models/tag';
import Const from '../../middles/useful/const';


let sql = sqlProvider.notes;

export class Repository{

  private static readonly SELECT_NOTES_BY_TAGS_START =
  'select json_array(\'{title, text, isDone, creationDate, lastModficationDate, links}\', array[title, text, isDone:: text, creationDate::text, lastModficationDate::text, links::text]) from attic.notes join attic.notes_tags as rel on title=noteTitle where rel.userId=\'';

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }

  addTags = (note:Note, tags:TagClass.Tag[], roles:string[]):Promise<any>=>{
    if(tags.length!=roles.length){
      throw new Error('mismatch');
    }
    /*must use a transaction here.*/
    return this.db.tx(t=>{
      let queries:any[]=[tags.length];
      for(let i=0;i<tags.length;i++){
        let values:any[]=[
          note.userId,
          note.title,
          tags[i].title,
          roles[i]
        ]
        queries.push(t.one(sql.addTags, values, (note:any)=>{note.result}));
      }
      return t.batch(queries);
    })
  }

  changeLinks = (note: Note, links: string[]):Promise<any>=>{
    let values:any[]=[note.userId, note.title, links];
    return this.db.one(sql.changeLinks,values, (note:any)=>{return note.result});
  }

  changeText = (note: Note, newText: string):Promise<any>=>{
    let values:any[]=[note.userId, note.title, newText];
    return this.db.one(sql.changeText, values, (note:any)=>{return note.result});
  }

  changeTitle = (note:Note, newTitle: string):Promise<any>=>{
    let values:any[]=[note.userId, note.title, newTitle];
    return this.db.one(sql.changeTitle, values, (note:any)=>{return note.result});
  }

  /*rewrite a bit, will be done into a transaction..*/
  createNoteAll = (note:Note):Promise<Note>=>{
    let values: any[]=[
      note.userId,
      note.title,
      note.text,
      note.isDone,
      JSON.stringify(note.links)
    ];

    return this.db.one(sql.createNoteAll, values, (note:any)=>{return note.result});
  }

  createNoteWithNoLinks = (note: Note):Promise<Note>=>{
    let values: any[]=[
      note.userId,
      note.title,
      note.text,
      note.isDone,
    ];

    return this.db.one(sql.createNoteWithNoLinks, values, (note:any)=>{return note.result});
  }

  createNoteWithNoIsDone = (note: Note):Promise<Note>=>{
    let values: any[]=[
      note.userId,
      note.title,
      note.text,
      JSON.stringify(note.links)
    ];

    return this.db.one(sql.createNoteWithNoIsDone, values, (note:any)=>{return note.result});
  }

  createNoteWithNoLinksNoIsDone = (note: Note):Promise<Note>=>{
    let values: any=[
      note.userId,
      note.title,
      note.text,
    ];

    return this.db.one(sql.createNoteWithNoLinksNoIsDone, values, (note:any)=>{return note.result});
  }

  // removeNote = (note:Note):Promise<any>=>{
  //   let values:any = note.getValues();
  //   return this.db.one(sql.removeNote, values,(result:any)=>{return result.rowCont});
  // }
  removeNote = (note:Note):Promise<any>=>{
    let values:any = note.getValues();
    return this.db.none(sql.removeNote, values);
  }

  removeTagsFromNote = (note:Note, tags: TagClass.Tag[]):Promise<any>=>{
    let values: any=note.getValues();
    return this.db.tx(t=>{
      let queries:any[]=[tags.length];
      for(let i=0;i<tags.length;i++){
        let values:any={
          userId:note.userId,
          noteTitle:note.title,
          tagTitle:tags[i].title
        };
        queries.push(t.none(sql.removeTagsFromNote, values));
      }
      return t.batch(queries);
    });
  }

  /*
  select title, text, isDone, creationDate, lastModficationDate, links
  from attic.notes join attic.notes_tags on title=noteTitle
  where attic.notes.userId=$1 and tagTitle=$2;
  */
  private static getQueryNotesByTagsNoRole(userId: string, tags:TagClass.Tag[]):string{
    let tagsTitle:string[]=tags.map((currentValue:TagClass.Tag)=>{
      return currentValue.title;
    });

    let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
    query = query.concat(userId+'\'' );
    query = query.concat('and ( tagTitle=\'');

    /*select ... from ... where userId='ciao' and (tagTitle='*/

    let joined:string = tagsTitle.join('\' and tagTitle = \'');
    joined = joined.concat('\');');

    /*' or tagTitle='something */

    return query.concat(joined);
  }

  private static getQueryNotesByTagsWithRole(userId: string, tags:TagClass.Tag[], roles:string[]):string{

    let rolesTags:any[]=tags.map((currentValue:TagClass.Tag, currentIndex: number)=>{
      return {role:roles[currentIndex], title: currentValue.title};
    });

    let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
    query = query.concat(userId+'\'' );
    query = query.concat('and ');
    let joined:string='';

    for(let obj of rolesTags){
      let tmp:string = '(tagTitle =\''+obj.title+' and role = \''+obj.role+'\') and';
      joined = joined.substring(0, joined.lastIndexOf('and'));
    }

    joined = joined.concat('\);');
    query = query.concat(joined);
    return query;
  }

  selectNotesByTagsNoRole = (userId: string, tags:TagClass.Tag[]):Promise<any>=>{
    let values:string = Repository.getQueryNotesByTagsNoRole(userId,tags)
    return this.db.many(values);
  }


  selectNotesByTagsWithRole = (userId: string, tags:TagClass.Tag[], roles:string[]):Promise<any>=>{
    if(tags.length!=roles.length){
      throw new TypeError(Const.ERR_DIFF_LENGTH);
    }
    let values:string = Repository.getQueryNotesByTagsWithRole(userId, tags, roles);
    return this.db.many(values);
  }

  selectNoteByTitle = (note:Note):Promise<any>=>{
    return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note:any)=>{
      return note});
  }

  selectNotesByTitleReg = (userId:string, title:string):Promise<any>=>{
    return this.db.many(sql.selectNotesByTitleReg, [userId, title]);
  }

  selectNotesByTextReg = (userId:string, text:string):Promise<any>=>{
    return this.db.many(sql.selectNotesByTextReg, [userId, text]);
  }

  selectNotesFull = (userId:string):Promise<any>=>{
    return this.db.many(sql.selectNotesFull, [userId]);
  }

  selectNotesMin = (user: User):Promise<any>=>{
    return this.db.any(sql.selectNotesMin,[user.userId]);
  }

  setDone = (note:Note, done: boolean):Promise<any>=>{
    let values:any[]=[note.isDone, note.title, done];
    return this.db.one(sql.setDone, values, (note:any)=>{return note.result});
  }

}
