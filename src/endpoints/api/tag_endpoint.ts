import {TagExtraMin} from '../../models/tag';
import User from '../../models/user';

import {Const} from '../../middles/useful/const';
import Utils from '../../middles/useful/utils';
import {AnyResult, BasicResult, JsonError } from '../../middles/useful/types';

import TagMiddle from '../../middles/tag_middle';

import * as express from 'express';

/*
class TagEndpointParamCheck{
  static title(req: express.Request):BasicResult{
    let result:any=null;
    if(!req.body.tag.title || !req.body.tag){
      result = Utils.jsonErr(new JsonError(Const.TAG_TITLE_REQUIRED));
    }
    return result;
  }

  static changeTitle(req: express.Request):BasicResult{
    let result:any=TagEndpointParamCheck.title(req);
    if(!req.body.tag.newtitle){
      result = Utils.jsonErr(new JsonError(Const.TAG_NEW_TITLE_REQUIRED));
    }
    return result;
  }

  static createTag(req: express.Request):BasicResult{
    let result:any=null;
    if(!req.params.title){
      result = Utils.jsonErr(new JsonError(Const.TAG_TITLE_PARAM_REQUIRED));
    }
    return result;
  }

  static removeTag(req: express.Request):BasicResult{
    return TagEndpointParamCheck.createTag(req);
  }

  static selectTagByTitle(req: express.Request):BasicResult{
    return TagEndpointParamCheck.createTag(req);
  }

  static selectTagsByTitleReg(req: express.Request):BasicResult{
    return TagEndpointParamCheck.title(req);
  }
}
*/

export default class TagEndpoint{

  public static changeTitle(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tag:TagExtraMin = new TagExtraMin(req.body.tag.title, user.userid);
    let newTitle:string;
    // let result:any = TagEndpointParamCheck.changeTitle(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    newTitle = req.body.tag.newtitle;
    TagMiddle.changeTitle(tag, newTitle)
    .then(result=>{
      res.json(result);
    })
  }

  public static createTag(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tag:TagExtraMin = new TagExtraMin(req.params.title, user.userid);
    // let result:any = TagEndpointParamCheck.createTag(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    TagMiddle.createTag(tag)
    .then(result=>{
      res.json(result);
    })
  }

  public static removeTag(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tag:TagExtraMin = new TagExtraMin(req.params.title, user.userid);
    // let result:any = TagEndpointParamCheck.removeTag(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    TagMiddle.removeTag(tag)
    .then(result=>{
      res.json(result);
    })
  }

  public static selectTagByTitle(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    let tag:TagExtraMin = new TagExtraMin(req.params.title, user.userid);
    // let result:any = TagEndpointParamCheck.selectTagByTitle(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // }
    // console.log('the object is:');console.log(JSON.stringify(tag));
    TagMiddle.selectTagByTitle(tag)
    .then(result=>{
      res.json(result);
    })
  }

  /*must write the postgres function!*/
  public static selectTagsAlmostMinByTitleReg(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    // let result:any = TagEndpointParamCheck.selectTagsByTitleReg(req);
    // if(result!=null){
    //   res.json(result);
    //   return;
    // };
    let title:string = '%'+req.body.tag.title+'%';
    TagMiddle.selectTagsAlmostMinByTitleReg(user, title)
    .then(result=>{
      res.json(result);
    })
  }

  // public static selectTagsFull = (req: express.Request, res: express.Response, next)=>{
  //   let user:User=Utils.extractUser(req);
  //   TagMiddle.selectTagsFull(user)
  //   .then(result=>{
  //     res.json(result);
  //   })
  // }

  public static selectAllTagsAlmostMin(req: express.Request, res: express.Response, next){
    let user:User=Utils.extractUser(req);
    TagMiddle.selectAllTagsAlmostMin(user)
    .then(result=>{
      res.json(result);
    })
  }


}
