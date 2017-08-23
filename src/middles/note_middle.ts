import {Note, NoteExtraMin} from '../models/note';
import {TagExtraMin} from '../models/tag';
import User from '../models/user';
import * as db from '../postgres';
import {BasicResult, Result, AnyResult, NoteExtraMinResult,
  NoteExtraMinWithDateResult,NoteResult} from './useful/types';
import Utils from './useful/utils';
import {Const} from './useful/const';

/*
the middle never throw exception, just return a basic result.
doing so, the endpoint willbe easy to write (no catch).
*/

/*
a few notes
if export default class Foo --> import Foo from
if export class --> import {} or assign a name to the 'file' and use it as namespace
*/



export default class NoteMiddle{

public static addTags (note:NoteExtraMin, tags:TagExtraMin[], roles:string[]):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.addTags(note, tags, roles)
    .then(result=>{
      console.log(result);
      resolve(new Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static changeDone (note:NoteExtraMin, done:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.changeDone(note, done)
      .then(result=>{
        resolve(new BasicResult(true, JSON.stringify(result)));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
  });
}


public static changeLinks (note:NoteExtraMin, links:string[]):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.changeLinks(note, links)
    .then(result=>{
      // resolve(new types.BasicResult(true, JSON.stringify(result)));
      resolve(new Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static changeText (note:NoteExtraMin, text:string):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.changeText(note, text)
    .then(result=>{
      // resolve(new BasicResult(true, JSON.stringify(result)));
      resolve(new Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static changeTitle (note:NoteExtraMin, title:string):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.changeTitle(note, title)
    .then(result=>{
      // resolve(new BasicResult(true, JSON.stringify(result)));
      resolve(new Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static createNote (note:Note):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let result:Promise<any>;
    result=db.notes.createNote(note);
    result.then(result=>{

      // console.log('the result');
      // console.log(JSON.stringify(result));
      /*creating the object that we'll return*/
      let noteRes:Note = result[0].result as Note;
      // noteRes.maintags = ((note.maintags==null)? [] : note.maintags);
      // noteRes.othertags = ((note.othertags==null)? [] : note.othertags);

      resolve(new NoteResult(true, noteRes));
    })
    result.catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static removeNote (note:NoteExtraMin):Promise<Result>{
  return new Promise((resolve, reject)=>{
    db.notes.removeNote(note)
      .then(result=>{
        // if(result==1){
        //   resolve(new types.Result(true));
        // }else{
        //   resolve(Utils.jsonErr(new Error(Const.ERR_DB+': '+result)));
        // }
        resolve(new Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
  })
}

public static removeTagsFromNote (note:NoteExtraMin, tags:TagExtraMin[]):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.removeTagsFromNote(note, tags)
      .then(result=>{
        // resolve(new types.Result(true, JSON.stringify(result)));
        resolve(new Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
  })
}

// public static selectNotesByTagsNoRole(userId: string, tags:Tag[], and: boolean):Promise<types.Result>{
//   return new Promise<types.Result>((resolve, reject)=>{
//     db.notes.selectNotesByTagsNoRole(userId, tags, and)
//     .then(rawResult=>{
//       resolve(new types.AnyResult(true, rawResult));
//     })
//     .catch(error=>{
//       resolve(Utils.jsonErr(error));
//     })
//   });
// }
//
//
// public static selectNotesByTagsWithRole(userId: string, tags:Tag[], roles:string[], and: boolean):Promise<types.Result>{
//   return new Promise<types.Result>((resolve, reject)=>{
//     /*even if the db takes control of correct parameters, I prefer doing it now too.*/
//     if(tags.length!=roles.length){
//       resolve(Utils.jsonErr(new TypeError(Const.ERR_DIFF_LENGTH)));
//     }
//     db.notes.selectNotesByTagsWithRole(userId, tags, roles, and)
//     .then(rawResult=>{
//       resolve(new types.AnyResult(true, rawResult));
//     })
//     .catch(error=>{
//       resolve(Utils.jsonErr(error));
//     })
//   });
// }


public static selectNotesMinByTagsAnd(user:User, tags:TagExtraMin[], withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTagsAnd(user, tags);
    }else{
      p=db.notes.selectNotesMinByTagsAnd(user, tags)
    }
    p.then(result=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, result, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  })
}


public static selectNotesMinByTagsOr(user:User, tags:TagExtraMin[], withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTagsOr(user, tags);
    }else{
      p=db.notes.selectNotesMinByTagsOr(user, tags)
    }
    p.then(result=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, result, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  })
}

public static selectNoteByTitle(note:NoteExtraMin):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    db.notes.selectNoteByTitle(note)
    .then(note=>{
      resolve(new NoteResult(true, note));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesByTitleReg(user:User, title:string, withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTitleReg(user, title);
    }else{
      p=db.notes.selectNotesMinByTitleReg(user, title);
    }
    p.then(notes=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesByTextReg(user:User, text:string, withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTextReg(user, text)
    }else{
      p=db.notes.selectNotesMinByTextReg(user,text);
    }
    p.then(notes=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesMin(user:User, withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDate(user);
    }else{
      p=db.notes.selectNotesMin(user);
    }
    p.then(notes=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesMinByIsDone(user:User, isDone:boolean, withDate:boolean):Promise<Result>{
  return new Promise<Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByIsDone(user, isDone);
    }else{
      p=db.notes.selectNotesMinByIsDone(user, isDone);
    }
    p.then(notes=>{
      resolve(NoteExtraMinWithDateResult.getAppropriateNoteResult(true, notes, withDate));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


  // public static selectAllNotesMin(user:User):Promise<types.Result>{
  //   return new Promise<types.Result>((resolve, reject)=>{
  //     db.notes.selectNotesMin(user)
  //     .then(notes=>{
  //       resolve(new types.AnyResult(true, notes));
  //     })
  //     .catch(error=>{
  //       resolve(Utils.jsonErr(error));
  //     })
  //   });
  // }
  //
  // public static selectAllNotesMinWithDate(user:User):Promise<types.Result>{
  //   return new Promise<types.Result>((resolve, reject)=>{
  //     db.notes.selectNotesMinWithDate(user)
  //     .then(notes=>{
  //       resolve(new types.AnyResult(true, notes));
  //     })
  //     .catch(error=>{
  //       resolve(Utils.jsonErr(error));
  //     })
  //   });
  // }







}
