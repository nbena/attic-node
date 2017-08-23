import {Note, NoteExtraMin} from '../../models/note';
import {TagExtraMin} from '../../models/tag';
import User from '../../models/user';

import {Const} from '../../middles/useful/const';
import Utils from '../../middles/useful/utils';
import {AnyResult, BasicResult, JsonError } from '../../middles/useful/types';

import NoteMiddle from '../../middles/note_middle';


import * as express from 'express';

// class NoteEndpointParamCheck{
//
//   static title(req: express.Request):BasicResult{
//     let result:any = null;
//     if(!req.body.note.title || !req.body.note){
//       result = Utils.jsonErr(new JsonError(Const.NOTE_REQUIRED));
//     }
//     return result;
//   }
//
//   static addTags(req: express.Request):BasicResult{
//     let result: any = null;
//     result = NoteEndpointParamCheck.title(req);
//     if(req.body.note.maintags == null && req.body.note.othertags == null){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_REQUIRED));
//     }
//     else if(req.body.note.maintags!=null){
//       if(req.body.note.maintags instanceof Array==false){
//         result = Utils.jsonErr(new JsonError(Const.NO_ARR_INST));
//       }
//
//     }
//     if(req.body.note.othertags!=null){
//       if(req.body.note.othertags instanceof Array==false){
//         result = Utils.jsonErr(new JsonError(Const.NO_ARR_INST));
//       }
//     }
//     return result;
//   }
//
//
//   static changeLinks(req: express.Request):BasicResult{
//     let result: any = null;
//     result = NoteEndpointParamCheck.title(req);
//     if(!req.body.note.links || req.body.note.links !instanceof Array){
//       result = Utils.jsonErr(new JsonError(Const.LINKS_REQUIRED));
//     }
//     return result;
//   }
//
//   static changeText(req: express.Request):BasicResult{
//     let result: any = null;
//     result = NoteEndpointParamCheck.title(req);
//     if(!req.body.note.text){
//       result = Utils.jsonErr(new JsonError(Const.TEXT_REQUIRED));
//     }
//     return result;
//   }
//
//   static changeTitle(req: express.Request):BasicResult{
//     let result: any = null;
//     result = NoteEndpointParamCheck.title(req);
//     if(!req.body.note.newtitle){
//       result = Utils.jsonErr(new JsonError(Const.TITLE_REQUIRED));
//     }
//     return result;
//   }
//
//   static createNote(req: express.Request):BasicResult{
//     let result:any=NoteEndpointParamCheck.changeText(req);
//     if(req.body.note.maintags){
//       if(req.body.note.maintags instanceof Array==false){
//         result = Utils.jsonErr(new JsonError(Const.INVALID_NOTE));
//       }
//     }
//     if(req.body.note.otherTags){
//       if(req.body.note.otherTags instanceof Array==false){
//         result = Utils.jsonErr(new JsonError(Const.INVALID_NOTE));
//       }
//     }
//     if(req.body.note.links){
//       if(req.body.note.links instanceof Array==false){
//         result = Utils.jsonErr(new JsonError(Const.LINK_NOT_ARRAY));
//       }
//     }
//     return result;
//   }
//
//   static removeNote(req: express.Request):BasicResult{
//     let result:any=null;
//     if(!req.params.title){
//       result=Utils.jsonErr(new JsonError(Const.TITLE_REQUIRED));
//     }
//     return result;
//   }
//
//   /*rewrite this checks.*/
//   static removeTagsFromNote(req: express.Request):BasicResult{
//     let result:any = null;
//     result = NoteEndpointParamCheck.title(req);
//     if(!req.body.note.tags && req.body.note.tags !instanceof Array){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_REQUIRED));
//     }
//     return result;
//   }
//
//   static selectNotesByTagsNoRole(req: express.Request):BasicResult{
//     // console.log('req: is');
//     // console.log(JSON.stringify(req.body));
//     let result:any = null;
//     if(req.body.tags ==  null){
//       result = Utils.jsonErr(new JsonError(Const.GEN_TAGS_REQUIRED));
//     }else if(req.body.tags instanceof Array==false){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_NOT_ARRAY));
//     }
//     return result;
//   }
//
//   static selectNoteByTitle(req: express.Request):BasicResult{
//     return NoteEndpointParamCheck.removeNote(req);
//   }
//
//   static selectNotesByTextReg(req: express.Request):BasicResult{
//     let result:any = null;
//     if(req.body.text == null /*|| req.body.title instanceof String == false*/){
//       result = Utils.jsonErr(new JsonError(Const.TEXT_BASIC_REQUIRED));
//     }
//     return result;
//   }
//
//   static selectNotesByTitleReg(req: express.Request):BasicResult{
//     let result:any = null;
//     if(req.body.title == null /*|| req.body.title instanceof String == false*/){
//       result = Utils.jsonErr(new JsonError(Const.TITLE_BASIC_REQUIRED));
//     }
//     return result;
//   }
//
//   static selectNotesByTagsWithRole(req: express.Request):BasicResult{
//     let result:any = null;
//     if(req.body.maintags ==  null || req.body.othertags == null){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_REQUIRED));
//     }
//     if(req.body.maintags && req.body.maintags !instanceof Array){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_NOT_ARRAY));
//     }
//     if(req.body.othertags && req.body.othertags !instanceof Array){
//       result = Utils.jsonErr(new JsonError(Const.TAGS_NOT_ARRAY));
//     }
//     return result;
//   }
//
//   static setDone(req: express.Request):BasicResult{
//     let result:any=NoteEndpointParamCheck.title(req);
//     if(!req.body.note.isdone){
//       result = Utils.jsonErr(new JsonError(Const.IS_DONE_REQUIRED));
//     }
//     return result;
//   }
//
// }

export default class NoteEndpoint{


  public static addTags(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tags:TagExtraMin[]=[];
    // let tagsTemp: string[];
    let roles:string[]=[];
    // let result:Promise<any>;
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);

    // let check = NoteEndpointParamCheck.addTags(req);
    // if(check!=null){
    //   res.json(check);
    //   return;
    // }

    // tags = [];
    // roles = [];

    if(req.body.note.maintags){
      req.body.note.maintags.forEach(obj=>{
        let tag:TagExtraMin=new TagExtraMin(obj);
        tags.push(tag);
        roles.push('mainTags');
      });
    }
    if(req.body.note.othertags){
      req.body.note.othertags.forEach(obj=>{
        let tag:TagExtraMin=new TagExtraMin(obj);
        tags.push(tag);
        roles.push('otherTags');
      });
    }
    // console.log('the tags');console.log(JSON.stringify(tags));
    NoteMiddle.addTags(note, tags, roles)
    .then(result=>{
      res.json(result);
    })
  }

  public static changeDone(req: express.Request, res: express.Response, next){
    let user:User = Utils.extractUser(req);
    let isDone:boolean=req.body.note.isdone;
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);
    // let result:any=NoteEndpointParamCheck.setDone(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // note = new Note();
    // note.userid=user.userid;
    // note.title=req.body.note.title;
    // isDone=req.body.note.isdone;
    NoteMiddle.changeDone(note, isDone)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesMin(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    NoteMiddle.selectNotesMin(user, false)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNotesMinWithDate(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    NoteMiddle.selectNotesMin(user, true)
    .then(result=>{
      res.json(result);
    })
  }


  public static changeLinks(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);
    let links:string[] = req.body.note.links;
    // let result:any = NoteEndpointParamCheck.changeLinks(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }

    // note = new Note();
    // note.title=req.body.note.title;
    // links = req.body.note.links;
    // note.userid = user.userid;
    NoteMiddle.changeLinks(note, links)
    .then(result=>{
      res.json(result);
    })
  }


  public static changeText(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);
    let text:string=req.body.note.text;
    // let result:any = NoteEndpointParamCheck.changeText(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }

    // note = new Note();
    // note.title=req.body.note.title;
    // text = req.body.note.text;
    // note.userid = user.userid;
    NoteMiddle.changeText(note, text)
    .then(result=>{
      res.json(result);
    })
  }

  public static changeTitle(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);
    let newTitle:string=req.body.note.newtitle;
    // let result:any = NoteEndpointParamCheck.changeTitle(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }

    // note = new Note();
    // note.title=req.body.note.title;
    // newTitle = req.body.note.newtitle;
    // note.userid = user.userid;
    NoteMiddle.changeTitle(note, newTitle)
    .then(result=>{
      res.json(result);
    })
  }

  public static createNote(req:express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:Note;
    // let result:any = NoteEndpointParamCheck.createNote(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }

    note = new Note();
    note.userid=user.userid;
    note.title=req.body.note.title;
    note.text=req.body.note.text;
    // note.isdone=((req.body.note.isdone !=null) ? req.body.note.isdone : false);
    //
    // note.links=((req.body.note.links !=null) ? req.body.note.links : []);

    // note.links=((req.body.note.links) ? req.body.note.links : null);

    //already checked that it's an array.

    // if(req.body.note.maintags){ --> default schema
      // if(req.body.note.maintags.length>0){
        note.maintags=req.body.note.maintags;
      // }
    // }else{
    //   note.maintags = [];
    // }

    // if(req.body.note.othertags){
      // if(req.body.note.othertags.length>0){
        note.othertags=req.body.note.othertags;
      // }
    // }else{
    //   note.othertags = [];
    // }

    if(req.body.note.lastmodificationdate){
      note.lastmodificationdate = new Date(/*Date.parse(*/req.body.note.lastmodificationdate/*)*/);
    }else{
      note.lastmodificationdate=new Date();
    }

    // if(req.body.note.lastmodificationdate && req.body.note.lastmodificationdate instanceof Date){
    //   note.lastmodificationdate = req.body.note.lastmodificationdate;
    //   console.log('ok lastmodificationdate');
    // }else{
    //   note.lastmodificationdate=new Date();
    // }

    if(req.body.note.creationdate){
      note.creationdate = new Date(req.body.note.creationdate);
    }else{
      note.creationdate=new Date();
    }

    // note.maintags=((req.body.note.maintags) ? req.body.note.maintags : null);
    // note.othertags=((req.body.note.othertags) ? req.body.note.othertags : null);

    console.log(note);

    NoteMiddle.createNote(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static removeNote(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.params.title, user.userid);
    // let result:any = NoteEndpointParamCheck.removeNote(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // note=new Note();
    // note.userid=user.userid;
    // note.title=req.params.title;
    NoteMiddle.removeNote(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static removeTagsFromNote(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.body.title, user.userid);
    let tags:TagExtraMin[]=[];
    // let result:any=NoteEndpointParamCheck.removeTagsFromNote(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // note = new Note();
    // note.title=req.body.note.title;
    // note.userid=user.userid;
    tags = req.body.note.tags.map(obj=>{return new TagExtraMin(obj)});
    NoteMiddle.removeTagsFromNote(note, tags)
    .then(result=>{
      res.json(result);
    })
  }

  // public static selectNotesByTagsNoRoleAnd(req: express.Request, res: express.Response, next){
  //   return NoteEndpoint.selectNotesByTagsNoRoleCore(req, res, next, true);
  // }
  //
  // public static selectNotesByTagsWithRoleAnd(req: express.Request, res: express.Response, next){
  //   return NoteEndpoint.selectNotesByTagsWithRoleCore(req, res, next, true);
  // }
  //
  //
  // public static selectNotesByTagsNoRoleOr(req: express.Request, res: express.Response, next){
  //   return NoteEndpoint.selectNotesByTagsNoRoleCore(req, res, next, false);
  // }
  //
  // public static selectNotesByTagsWithRoleOr(req: express.Request, res: express.Response, next){
  //   return NoteEndpoint.selectNotesByTagsWithRoleCore(req, res, next, false);
  // }
  //
  //
  // public static selectNotesByTagsNoRoleCore(req: express.Request, res: express.Response, next, and: boolean){
  //   let user:User = Utils.extractUser(req);
  //   let tags:TagClass.Tag[]=[];
  //   // let result:any=NoteEndpointParamCheck.selectNotesByTagsNoRole(req);
  //   // if(result!=null){
  //   //   res.json(result);
  //   //   return;
  //   // }
  //   req.body.tags.map((currentValue)=>{
  //     let t = new TagClass.Tag();
  //     t.title=currentValue;
  //     tags.push(t);
  //   });
  //   NoteMiddle.selectNotesByTagsNoRole(user.userid, tags, and)
  //   .then(result=>{
  //     res.json(result);
  //   })
  // }
  //
  // public static selectNotesByTagsWithRoleCore(req: express.Request, res: express.Response, next, and: boolean){
  //   let user:User = Utils.extractUser(req);
  //   let tags:TagClass.Tag[]=[];
  //   let roles:string[]=[];
  //   // let result:any=NoteEndpointParamCheck.selectNotesByTagsWithRole(req);
  //   // if(result!=null){
  //   //   res.json(result);
  //   //   return;
  //   // }
  //   if(req.body.note.maintags){
  //     req.body.mainTags.map((currentValue, currentIndex)=>{
  //       let tag:TagClass.Tag=new TagClass.Tag();
  //       tag.title=currentValue;
  //       tags.push(tag);
  //       roles.push('maintags');
  //     });
  //   }
  //   if(req.body.note.othertags){
  //     req.body.otherTags.map((currentValue, currentIndex)=>{
  //       let tag:TagClass.Tag=new TagClass.Tag();
  //       tag.title=currentValue;
  //       tags.push(tag);
  //       roles.push('othertags');
  //     });
  //   }
  //   NoteMiddle.selectNotesByTagsWithRole(user.userid, tags, roles, and)
  //   .then(result=>{
  //     res.json(result);
  //   })
  // }


  public static selectNotesMinByTagsOr(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tags:TagExtraMin[]=req.body.note.tags.map(obj=>{return new TagExtraMin(obj)});
    NoteMiddle.selectNotesMinByTagsOr(user, tags, false)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesMinByTagsAnd(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tags:TagExtraMin[]=req.body.note.tags.map(obj=>{return new TagExtraMin(obj)});
    NoteMiddle.selectNotesMinByTagsAnd(user, tags, false)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesMinWithDateByTagsOr(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tags:TagExtraMin[]=req.body.note.tags.map(obj=>{return new TagExtraMin(obj)});
    NoteMiddle.selectNotesMinByTagsOr(user, tags, true)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesMinWithDateByTagsAnd(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tags:TagExtraMin[]=req.body.note.tags.map(obj=>{return new TagExtraMin(obj)});
    NoteMiddle.selectNotesMinByTagsAnd(user, tags, true)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNoteByTitle(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let note:NoteExtraMin = new NoteExtraMin(req.params.title, user.userid);
    // let result:any=NoteEndpointParamCheck.selectNoteByTitle(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // note = new Note();
    // note.title=req.params.title;
    // note.userid=user.userid;
    NoteMiddle.selectNoteByTitle(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesMinByTitleReg(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let title:string;
    // let result:any=NoteEndpointParamCheck.selectNotesByTitleReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    title=req.body.note.title;
    // title='%'+title+'%';
    NoteMiddle.selectNotesByTitleReg(user, title,false)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNotesMinByTextReg(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let text:string;
    // let result:any=NoteEndpointParamCheck.selectNotesByTextReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    text=req.body.note.text;
    // text='%'+text+'%';
    NoteMiddle.selectNotesByTextReg(user, text, false)
    .then(result=>{
      res.json(result);
    })
  }



  public static selectNotesMinWithDateByTitleReg(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let title:string;
    // let result:any=NoteEndpointParamCheck.selectNotesByTitleReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    title=req.body.note.title;
    // title='%'+title+'%';
    NoteMiddle.selectNotesByTitleReg(user, title,true)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNotesMinWithDateByTextReg(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let text:string;
    // let result:any=NoteEndpointParamCheck.selectNotesByTextReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    text=req.body.note.text;
    // text='%'+text+'%';
    NoteMiddle.selectNotesByTextReg(user, text, true)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNotesMinWithDateByIsDone(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let isDone:boolean = req.body.note.isdone;
    // let result:any=NoteEndpointParamCheck.selectNotesByTextReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // text='%'+text+'%';
    NoteMiddle.selectNotesMinByIsDone(user, isDone, true)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNotesMinByIsDone(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let isDone:boolean = req.body.note.isdone;
    // let result:any=NoteEndpointParamCheck.selectNotesByTextReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // text='%'+text+'%';
    NoteMiddle.selectNotesMinByIsDone(user, isDone, false)
    .then(result=>{
      res.json(result);
    })
  }





}
