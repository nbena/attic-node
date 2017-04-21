import { IDatabase, IMain } from 'pg-promise';
import * as pgp from 'pg-promise';
import sqlProvider from '../sql';
import Note from '../../models/note';
import User from '../../models/user';
import * as TagClass from '../../models/tag';
import Const from '../../middles/useful/const';


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
  private static readonly SELECT_NOTES_BY_TAGS_START =
  'select json_build_object(\'title\', title, \'text\', text,\'isdone\', isDone, \'lastmodificationdate\', lastModificationDate, \'creationDate\', creationDate, \'links\', links) as note from attic.notes join attic.notes_tags as rel on title=noteTitle where rel.userid=\'';

  private db: IDatabase<any>;
  private pgp: IMain;

  constructor(db:any, pgp:IMain){
    this. db = db;
    this.pgp = pgp;
  }

  private addTagsString = (note:Note, tags: TagClass.Tag[], roles:string[]):string=>{
    let things: any[]=[];
    for(let i=0;i<tags.length;i++){
      things.push({
        noteTitle: note.title,
        tagTitle: tags[i].title,
        role: roles[i],
        userid: note.userid
      });
    }
    let res:string = this.pgp.helpers.insert(things, ['noteTitle', 'tagTitle', 'role', 'userid'], 'attic.notes_tags');
    res=res.replace('"attic.notes_tags"("noteTitle","tagTitle","role","userid")', "attic.notes_tags(noteTitle,tagTitle,role,userid)");
    return res;
  }


  addTags = (note:Note, tags:TagClass.Tag[], roles:string[]):Promise<any>=>{
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

  changeLinks = (note: Note, links: string[]):Promise<any>=>{
    let values:any[]=[note.userid, note.title, links];
    return this.db.one(sql.changeLinks,values, (note:any)=>{return note.result});
  }

  changeText = (note: Note, newText: string):Promise<any>=>{
    let values:any[]=[note.userid, note.title, newText];
    return this.db.one(sql.changeText, values, (note:any)=>{return note.result});
  }

  changeTitle = (note:Note, newTitle: string):Promise<any>=>{
    let values:any[]=[note.userid, note.title, newTitle];
    return this.db.one(sql.changeTitle, values, (note:any)=>{return note.result});
  }

  /*rewrite a bit, will be done into a transaction..*/
  createNoteAll = (note:Note):Promise<Note>=>{
    let values: any[]=[
      note.userid,
      note.title,
      note.text,
      note.isdone,
      JSON.stringify(note.links)
    ];

    return this.db.one(sql.createNoteAll, values, (note:any)=>{return note.result});
  }

  createNote = (note: Note):Promise<Note>=>{
    let values:any[]=[
      note.userid,
      note.title,
      note.text
    ];
    values.push(((note.isdone == null) ? false : note.isdone));
    values.push(((note.links == null) ? '[]' : note.links));

    console.log('values are');
    console.log(values);
    //first action will create the done,
    //the second it will insert the tags.

    let queries:any[]=[];
    let tags:TagClass.Tag[]=[];
    let roles:string[]=[];

    if(note.maintags !=null && note.maintags.length!=0){
        note.maintags.map((currentValue, currentIndex)=>{
          let tag =  new TagClass.Tag();
          tag.title = currentValue;
          roles.push('mainTags');
          tags.push(tag);
        });
    }

    if(note.maintags !=null && note.othertags.length !=0){
        note.othertags.map((currentValue, currentIndex)=>{
          let tag =  new TagClass.Tag();
          tag.title = currentValue;
          roles.push('otherTags');
          tags.push(tag);
        });
    }

    return this.db.tx(t=>{
      queries.push(t.one(sql.createNoteAll, values));
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
          userid:note.userid,
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
  where attic.notes.userid=$1 and tagTitle=$2;
  */
  private static getQueryNotesByTagsNoRole(userid: string, tags:TagClass.Tag[]):string{
    let tagsTitle:string[]=tags.map((currentValue:TagClass.Tag)=>{
      return currentValue.title;
    });

    let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
    query = query.concat(userid+'\'' );
    query = query.concat('and ( tagTitle=\'');

    /*select ... from ... where userid='ciao' and (tagTitle='*/

    let joined:string = tagsTitle.join('\' and tagTitle = \'');
    joined = joined.concat('\');');

    /*' or tagTitle='something */

    return query.concat(joined);
  }

  private static getQueryNotesByTagsWithRole(userid: string, tags:TagClass.Tag[], roles:string[]):string{

    let rolesTags:any[]=tags.map((currentValue:TagClass.Tag, currentIndex: number)=>{
      return {role:roles[currentIndex], title: currentValue.title};
    });

    let query:string = Repository.SELECT_NOTES_BY_TAGS_START;
    query = query.concat(userid+'\'' );
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

  selectNotesByTagsNoRole = (userid: string, tags:TagClass.Tag[]):Promise<any>=>{
    let values:string = Repository.getQueryNotesByTagsNoRole(userid,tags);
    console.log('the query is:');
    console.log(values);
    return this.db.many(values);
  }


  selectNotesByTagsWithRole = (userid: string, tags:TagClass.Tag[], roles:string[]):Promise<any>=>{
    if(tags.length!=roles.length){
      throw new TypeError(Const.ERR_DIFF_LENGTH);
    }
    let values:string = Repository.getQueryNotesByTagsWithRole(userid, tags, roles);
    return this.db.many(values);
  }

  selectNoteByTitle = (note:Note):Promise<any>=>{
    return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note:any)=>{
      return note});
  }

  selectNotesByTitleReg = (userid:string, title:string):Promise<any>=>{
    return this.db.many(sql.selectNotesByTitleReg, [userid, title]);
  }

  selectNotesByTextReg = (userid:string, text:string):Promise<any>=>{
    return this.db.many(sql.selectNotesByTextReg, [userid, text]);
  }

  selectNotesFull = (userid:string):Promise<any>=>{
    return this.db.many(sql.selectNotesFull, [userid]);
  }

  selectNotesMin = (user: User):Promise<any>=>{
    return this.db.any(sql.selectNotesMin,[user.userid]);
  }

  setDone = (note:Note, done: boolean):Promise<any>=>{
    let values:any[]=[note.isdone, note.title, done];
    return this.db.one(sql.setDone, values, (note:any)=>{return note.result});
  }

}
