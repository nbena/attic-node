import {TagExtraMin, Tag, TagAlmostMin} from '../models/tag';
import User from '../models/user';
import * as db from '../postgres';
import {TagResult, TagAlmostMinResult, TagExtraMinResult, AnyResult, Result} from './useful/types';
import Utils from './useful/utils';
import {Const} from './useful/const';

export default class TagMiddle{

  public static changeTitle(tag: TagExtraMin, newTitle: string):Promise<Result>{
    return new Promise((resolve, reject)=>{
      db.tags.changeTitle(tag, newTitle)
      .then(result=>{
        resolve(new Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }

  public static createTag(tag: TagExtraMin):Promise<Result>{
    return new Promise((resolve, reject)=>{
      db.tags.createTag(tag)
      .then(result=>{
        /*use this 'hack' because that tag parameter has already everything we want it to be, it just misses
        the noteslength. We add them and we can send it back to the user.
        */
        let res:TagAlmostMin = new TagAlmostMin(tag.title, tag.userid);
        res.noteslength = 0;
        resolve(new TagAlmostMinResult(true, res));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }


  public static removeTag(tag: TagExtraMin):Promise<Result>{
    return new Promise((resolve, reject)=>{
      db.tags.removeTag(tag)
      .then(result=>{
        // if(result==1){
        //   resolve(new Result(true));
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


  public static selectTagByTitle (tag: TagExtraMin):Promise<Result>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagByTitle(tag)
        .then(result=>{
          resolve(new TagResult(true, result));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }


  public static selectTagsAlmostMinByTitleReg (user:User, title:string):Promise<Result>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagsAlmostMinByTitleReg(user, title)
        .then(tags=>{
          resolve(new TagAlmostMinResult(true, tags));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }
  //
  // public static selectTagsFull (user:User)=>{
  //     return new Promise((resolve, reject)=>{
  //       db.tags.selectTagsFull(user)
  //       .then(tags=>{
  //         resolve(new AnyResult(true,tags));
  //       })
  //       .catch(error=>{
  //         resolve(Utils.jsonErr(error));
  //       })
  //     })
  // }

  public static selectAllTagsAlmostMin (user:User):Promise<Result>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagsAlmostMin(user)
        .then(tags=>{
          resolve(new TagAlmostMinResult(true, tags));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }

}
