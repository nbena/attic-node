import Note from '../../models/note';
import * as TagClass from '../../models/tag';
import User from '../../models/user';

import Const from '../../middles/useful/const';
import Utils from '../../middles/useful/utils';
import * as types from '../../middles/useful/types';

import NoteMiddle from '../../middles/note_middle';

import * as express from 'express';

class NoteEndpointParamCheck{

  static title = (req: express.Request):types.BasicResult=>{
    let result:any = null;
    if(!req.body.note.title || !req.body.note){
      result = Utils.jsonErr(new Error(Const.NOTE_REQUIRED));
    }
    return result;
  }

  static addTags = (req: express.Request):types.BasicResult=>{
    let result: any = null;
    result = NoteEndpointParamCheck.title(req);
    if(req.body.note.mainTags == null && req.body.note.otherTags == null){
      result = Utils.jsonErr(new Error(Const.TAGS_REQUIRED));
    }
    if(req.body.note.mainTags!=null && req.body.note.mainTags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.NO_ARR_INST));
    }
    if(req.body.note.otherTags!=null && req.body.note.otherTags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.NO_ARR_INST));
    }
    return result;
  }

  // static checkNote = (req:express.Request):any=>{
  //   let result;
  //   try{
  //     result=<Note>req.body.note; /*test this.*/
  //   }catch(e){
  //     result=Utils.jsonErr(new Error(Const.INVALID_NOTE));
  //   }
  //   return result;
  // }

  static changeLinks = (req: express.Request):types.BasicResult=>{
    let result: any = null;
    result = NoteEndpointParamCheck.title(req);
    if(!req.body.note.links || req.body.note.links !instanceof Array){
      result = Utils.jsonErr(new Error(Const.LINKS_REQUIRED));
    }
    return result;
  }

  static changeText = (req: express.Request):types.BasicResult=>{
    let result: any = null;
    result = NoteEndpointParamCheck.title(req);
    if(!req.body.note.text){
      result = Utils.jsonErr(new Error(Const.TEXT_REQUIRED));
    }
    return result;
  }

  static changeTitle = (req: express.Request):types.BasicResult=>{
    let result: any = null;
    result = NoteEndpointParamCheck.title(req);
    if(!req.body.note.newTitle){
      result = Utils.jsonErr(new Error(Const.TITLE_REQUIRED));
    }
    return result;
  }

  static createNote = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.changeText(req);
  }

  static removeNote = (req: express.Request):types.BasicResult=>{
    let result:any=null;
    if(!req.params.title){
      result=Utils.jsonErr(new Error(Const.TITLE_REQUIRED));
    }
    return result;
  }

  static removeTagsFromNote = (req: express.Request):types.BasicResult=>{
    let result:any = null;
    result = NoteEndpointParamCheck.title(req);
    if(!req.body.note.tags && req.body.note.tags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.TAGS_REQUIRED));
    }
    return result;
  }

  static selectNotesByTagsNoRole = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.removeTagsFromNote(req);
  }

  static selectNoteByTitle = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.removeNote(req);
  }

  static selectNotesByTextReg = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.changeText(req);
  }

  static selectNotesByTitleReg = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.title(req);
  }

  static selectNotesByTagsWithRole = (req: express.Request):types.BasicResult=>{
    return NoteEndpointParamCheck.addTags(req);
  }

  static setDone = (req: express.Request):types.BasicResult=>{
    let result:any=NoteEndpointParamCheck.title(req);
    if(!req.body.note.isDone){
      result = Utils.jsonErr(new Error(Const.IS_DONE_REQUIRED));
    }
    return result;
  }

}

export default class NoteEndpoint{


  public static addTags = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let tags:TagClass.Tag[];
    let tagsTemp: string[];
    let roles:string[]=[];
    let result:Promise<any>;
    let note:Note;

    let check = NoteEndpointParamCheck.addTags(req);
    if(check!=null){
      res.json(check);
      return;
    }

    note = new Note();
    note.title = req.body.note.title;

    note.userId=user.userId;
    if(req.body.note.mainTags){
      req.body.mainTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('mainTags');
      });
    }
    if(req.body.note.otherTags){
      req.body.otherTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('otherTags');
      });
    }
    result.then(result=>{
      res.json(result);
    })
  }

  public static selectAllNotesMin = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    NoteMiddle.selectAllNotesMin(user)
    .then(result=>{
      res.json(result);
    })
  }


  public static changeLinks = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let links:string[];
    let result:any = NoteEndpointParamCheck.changeLinks(req);
    if(result!=null){
      res.json(result);
      return;
    }

    note = new Note();
    note.title=req.body.note.title;
    links = req.body.note.links;
    note.userId = user.userId;
    NoteMiddle.changeLinks(note, links)
    .then(result=>{
      res.json(result);
    })
  }


  public static changeText = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let text:string;
    let result:any = NoteEndpointParamCheck.changeText(req);
    if(result!=null){
      res.json(result);
      return;
    }

    note = new Note();
    note.title=req.body.note.title;
    text = req.body.note.text;
    note.userId = user.userId;
    NoteMiddle.changeText(note, text)
    .then(result=>{
      res.json(result);
    })
  }

  public static changeTitle = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let newTitle:string;
    let result:any = NoteEndpointParamCheck.changeTitle(req);
    if(result!=null){
      res.json(result);
      return;
    }

    note = new Note();
    note.title=req.body.note.title;
    newTitle = req.body.note.newTitle;
    note.userId = user.userId;
    NoteMiddle.changeTitle(note, newTitle)
    .then(result=>{
      res.json(result);
    })
  }

  public static createNote = (req:express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let result:any = NoteEndpointParamCheck.createNote(req);
    if(result!=null){
      res.json(result);
      return;
    }

    note = new Note();
    note.userId=user.userId;
    note.title=req.body.note.title;
    note.text=req.body.note.text;
    note.isDone=((req.body.note.isDone) ? req.body.note.isDone : null);
    note.links=((req.body.note.links) ? req.body.note.links : null);
    NoteMiddle.createNote(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static removeNote = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let result:any = NoteEndpointParamCheck.removeNote(req);
    if(result!=null){
      res.json(result);
      return;
    }
    note=new Note();
    note.userId=user.userId;
    note.title=req.params.title;
    NoteMiddle.removeNote(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static removeTagsFromNote = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let tags:TagClass.Tag[]=[];
    let result:any=NoteEndpointParamCheck.removeTagsFromNote(req);
    if(result!=null){
      res.json(result);
      return;
    }
    note = new Note();
    note.title=req.body.note.title;
    note.userId=user.userId;
    req.body.note.tags.map((currentValue)=>{
      let t = new TagClass.Tag();
      t.title=currentValue;
      tags.push(t);
    });
    NoteMiddle.removeTagsFromNote(note, tags)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesByTagsNoRole = (req: express.Request, res: express.Response, next)=>{
    let user:User = Utils.extractUser(req);
    let tags:TagClass.Tag[]=[];
    let result:any=NoteEndpointParamCheck.selectNotesByTagsNoRole(req);
    if(result!=null){
      res.json(result);
      return;
    }
    req.body.note.tags.map((currentValue)=>{
      let t = new TagClass.Tag();
      t.title=currentValue;
      tags.push(t);
    });
    NoteMiddle.selectNotesByTagsNoRole(user.userId, tags)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNotesByTagsWithRole = (req: express.Request, res: express.Response, next)=>{
    let user:User = Utils.extractUser(req);
    let tags:TagClass.Tag[]=[];
    let roles:string[]=[];
    let result:any=NoteEndpointParamCheck.selectNotesByTagsWithRole(req);
    if(result!=null){
      res.json(result);
      return;
    }
    if(req.body.note.mainTags){
      req.body.mainTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('mainTags');
      });
    }
    if(req.body.note.otherTags){
      req.body.otherTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('otherTags');
      });
    }
    NoteMiddle.selectNotesByTagsWithRole(user.userId, tags, roles)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNoteByTitle = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let note:Note;
    let result:any=NoteEndpointParamCheck.selectNoteByTitle(req);
    if(result!=null){
      res.json(result);
      return;
    }
    note = new Note();
    note.title=req.params.title;
    note.userId=user.userId;
    NoteMiddle.selectNoteByTitle(note)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectNoteByTitleReg = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let title:string;
    let result:any=NoteEndpointParamCheck.selectNotesByTitleReg(req);
    if(result!=null){
      res.json(result);
      return;
    }
    title=req.body.note.title;
    NoteMiddle.selectNotesByTitleReg(user.userId, title)
    .then(result=>{
      res.json(result);
    })
  }


  public static selectNoteByTextReg = (req: express.Request, res: express.Response, next)=>{
    let user:User=Utils.extractUser(req);
    let text:string;
    let result:any=NoteEndpointParamCheck.selectNotesByTextReg(req);
    if(result!=null){
      res.json(result);
      return;
    }
    text=req.body.note.title;
    NoteMiddle.selectNotesByTextReg(user.userId, text)
    .then(result=>{
      res.json(result);
    })
  }

  public static setDone = (req: express.Request, res: express.Response, next)=>{
    let user:User = Utils.extractUser(req);
    let isDone:boolean;
    let note:Note;
    let result:any=NoteEndpointParamCheck.setDone(req);
    if(result!=null){
      res.json(result);
      return;
    }
    note = new Note();
    note.userId=user.userId;
    note.title=req.body.note.title;
    isDone=req.body.note.isDone;
    NoteMiddle.setDone(note, isDone)
    .then(result=>{
      res.json(result);
    })
  }


}
