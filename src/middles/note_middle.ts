import Note from '../models/note';
import * as TagClass from '../models/tag';
import User from '../models/user';
import * as db from '../postgres';
import * as types from './useful/types';
import Utils from './useful/utils';
import {Const} from './useful/const';

/*
the middle never throw exception, just return a basic result.
doing so, the endpoint willbe easy to write (no catch).
*/



export default class NoteMiddle{

public static addTags (note:Note, tags:TagClass.Tag[], roles:string[]):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.addTags(note, tags, roles)
    .then(result=>{
      console.log(result);
      resolve(new types.Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static changeLinks (note:Note, links:string[]):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.changeLinks(note, links)
    .then(result=>{
      // resolve(new types.BasicResult(true, JSON.stringify(result)));
      resolve(new types.Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static changeText (note:Note, text:string):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.changeText(note, text)
    .then(result=>{
      // resolve(new types.BasicResult(true, JSON.stringify(result)));
      resolve(new types.Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static changeTitle (note:Note, title:string):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.changeTitle(note, title)
    .then(result=>{
      // resolve(new types.BasicResult(true, JSON.stringify(result)));
      resolve(new types.Result(true));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static createNote (note:Note):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let result:Promise<any>;
    result=db.notes.createNote(note);
    result.then(result=>{

      // console.log('the result');
      // console.log(JSON.stringify(result));
      /*creating the object that we'll return*/
      let noteRes:Note = result[0].result as Note;
      // noteRes.maintags = ((note.maintags==null)? [] : note.maintags);
      // noteRes.othertags = ((note.othertags==null)? [] : note.othertags);

      resolve(new types.NoteResult(true, noteRes));
    })
    result.catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}

public static removeNote (note:Note):Promise<types.Result>{
  return new Promise((resolve, reject)=>{
    db.notes.removeNote(note)
      .then(result=>{
        // if(result==1){
        //   resolve(new types.Result(true));
        // }else{
        //   resolve(Utils.jsonErr(new Error(Const.ERR_DB+': '+result)));
        // }
        resolve(new types.Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
  })
}

public static removeTagsFromNote (note:Note, tags:TagClass.Tag[]):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.removeTagsFromNote(note, tags)
      .then(result=>{
        // resolve(new types.Result(true, JSON.stringify(result)));
        resolve(new types.Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
  })
}

// public static selectNotesByTagsNoRole(userId: string, tags:TagClass.Tag[], and: boolean):Promise<types.Result>{
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
// public static selectNotesByTagsWithRole(userId: string, tags:TagClass.Tag[], roles:string[], and: boolean):Promise<types.Result>{
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


public static selectNotesMinByTagsAnd(user:User, tags:TagClass.Tag[], withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTagsAnd(user, tags);
    }else{
      p=db.notes.selectNotesMinByTagsAnd(user, tags)
    }
    p.then(result=>{
      resolve(new types.AnyResult(true, result));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  })
}


public static selectNotesMinByTagsOr(user:User, tags:TagClass.Tag[], withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTagsOr(user, tags);
    }else{
      p=db.notes.selectNotesMinByTagsOr(user, tags)
    }
    p.then(result=>{
      resolve(new types.AnyResult(true, result));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  })
}

public static selectNoteByTitle(note:Note):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    db.notes.selectNoteByTitle(note)
    .then(note=>{
      resolve(new types.NoteResult(true, note));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesByTitleReg(userId: string, title:string, withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTitleReg(userId, title);
    }else{
      p=db.notes.selectNotesMinByTitleReg(userId, title);
    }
    p.then(notes=>{
      resolve(new types.AnyResult(true, notes));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesByTextReg(userId: string, text:string, withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByTextReg(userId, text)
    }else{
      p=db.notes.selectNotesMinByTextReg(userId,text);
    }
    p.then(notes=>{
      resolve(new types.AnyResult(true, notes));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesMin(user:User, withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDate(user);
    }else{
      p=db.notes.selectNotesMin(user);
    }
    p.then(notes=>{
      resolve(new types.AnyResult(true, notes));
    })
    .catch(error=>{
      resolve(Utils.jsonErr(error));
    })
  });
}


public static selectNotesMinByIsDone(user:User, isDone:boolean, withDate:boolean):Promise<types.Result>{
  return new Promise<types.Result>((resolve, reject)=>{
    let p:Promise<any>;
    if(withDate){
      p=db.notes.selectNotesMinWithDateByIsDone(user, isDone);
    }else{
      p=db.notes.selectNotesMinByIsDone(user, isDone);
    }
    p.then(notes=>{
      resolve(new types.AnyResult(true, notes));
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

  public static setDone (note:Note, done:boolean):Promise<types.Result>{
    return new Promise<types.Result>((resolve, reject)=>{
      db.notes.setDone(note, done)
        .then(result=>{
          resolve(new types.BasicResult(true, JSON.stringify(result)));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
    });
  }





}
