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
    if(req.body.note.maintags == null && req.body.note.otherTags == null){
      result = Utils.jsonErr(new Error(Const.TAGS_REQUIRED));
    }
    else if(req.body.note.maintags!=null){
      if(req.body.note.maintags instanceof Array==false){
        result = Utils.jsonErr(new Error(Const.NO_ARR_INST));
      }

    }
    if(req.body.note.othertags!=null){
      if(req.body.note.othertags !instanceof Array==false){
        result = Utils.jsonErr(new Error(Const.NO_ARR_INST));
      }
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
    if(!req.body.note.newtitle){
      result = Utils.jsonErr(new Error(Const.TITLE_REQUIRED));
    }
    return result;
  }

  static createNote = (req: express.Request):types.BasicResult=>{
    let result:any=NoteEndpointParamCheck.changeText(req);
    if(req.body.note.maintags){
      if(req.body.note.maintags instanceof Array==false){
        result = Utils.jsonErr(new Error(Const.INVALID_NOTE));
      }
    }
    if(req.body.note.otherTags){
      if(req.body.note.otherTags instanceof Array==false){
        result = Utils.jsonErr(new Error(Const.INVALID_NOTE));
      }
    }
    if(req.body.note.links){
      if(req.body.note.links instanceof Array==false){
        result = Utils.jsonErr(new Error(Const.LINK_NOT_ARRAY));
      }
    }
    return result;
  }

  static removeNote = (req: express.Request):types.BasicResult=>{
    let result:any=null;
    if(!req.params.title){
      result=Utils.jsonErr(new Error(Const.TITLE_REQUIRED));
    }
    return result;
  }

  /*rewrite this checks.*/
  static removeTagsFromNote = (req: express.Request):types.BasicResult=>{
    let result:any = null;
    result = NoteEndpointParamCheck.title(req);
    if(!req.body.note.tags && req.body.note.tags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.TAGS_REQUIRED));
    }
    return result;
  }

  static selectNotesByTagsNoRole = (req: express.Request):types.BasicResult=>{
    // console.log('req: is');
    // console.log(JSON.stringify(req.body));
    let result:any = null;
    if(req.body.tags ==  null){
      result = Utils.jsonErr(new Error(Const.GEN_TAGS_REQUIRED));
    }else if(req.body.tags instanceof Array==false){
      result = Utils.jsonErr(new Error(Const.TAGS_NOT_ARRAY));
    }
    return result;
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
    let result:any = null;
    if(req.body.maintags ==  null || req.body.othertags == null){
      result = Utils.jsonErr(new Error(Const.TAGS_REQUIRED));
    }
    if(req.body.maintags && req.body.maintags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.TAGS_NOT_ARRAY));
    }
    if(req.body.othertags && req.body.othertags !instanceof Array){
      result = Utils.jsonErr(new Error(Const.TAGS_NOT_ARRAY));
    }
    return result;
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
    let roles:string[];
    let result:Promise<any>;
    let note:Note;

    let check = NoteEndpointParamCheck.addTags(req);
    if(check!=null){
      res.json(check);
      return;
    }

    note = new Note();
    tags = [];
    roles = [];
    note.title = req.body.note.title;

    note.userid=user.userid;
    if(req.body.note.maintags){
      req.body.note.maintags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('mainTags');
      });
    }
    if(req.body.note.otherags){
      req.body.note.othertags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('otherTags');
      });
    }
    result = NoteMiddle.addTags(note, tags, roles);
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
    note.userid = user.userid;
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
    note.userid = user.userid;
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
    newTitle = req.body.note.newtitle;
    note.userid = user.userid;
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
    note.userid=user.userid;
    note.title=req.body.note.title;
    note.text=req.body.note.text;
    note.isdone=((req.body.note.isdone) ? req.body.note.isdone : null);

    // note.links=((req.body.note.links) ? req.body.note.links : null);

    //already checked that it's an array.

    if(req.body.note.maintags){
      if(req.body.note.maintags.length>0){
        note.maintags=req.body.note.maintags;
      }
    }else{
      note.maintags = null;
    }

    if(req.body.note.othertags){
      if(req.body.note.othertags.length>0){
        note.maintags=req.body.note.othertags;
      }
    }else{
      note.othertags = null;
    }

    // note.maintags=((req.body.note.maintags) ? req.body.note.maintags : null);
    // note.othertags=((req.body.note.othertags) ? req.body.note.othertags : null);

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
    note.userid=user.userid;
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
    note.userid=user.userid;
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
    req.body.tags.map((currentValue)=>{
      let t = new TagClass.Tag();
      t.title=currentValue;
      tags.push(t);
    });
    NoteMiddle.selectNotesByTagsNoRole(user.userid, tags)
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
    if(req.body.note.maintags){
      req.body.mainTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('mainTags');
      });
    }
    if(req.body.note.othertags){
      req.body.otherTags.map((currentValue, currentIndex)=>{
        let tag:TagClass.Tag=new TagClass.Tag();
        tag.title=currentValue;
        tags.push(tag);
        roles.push('otherTags');
      });
    }
    NoteMiddle.selectNotesByTagsWithRole(user.userid, tags, roles)
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
    note.userid=user.userid;
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
    NoteMiddle.selectNotesByTitleReg(user.userid, title)
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
    NoteMiddle.selectNotesByTextReg(user.userid, text)
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
    note.userid=user.userid;
    note.title=req.body.note.title;
    isDone=req.body.note.isdone;
    NoteMiddle.setDone(note, isDone)
    .then(result=>{
      res.json(result);
    })
  }


}
