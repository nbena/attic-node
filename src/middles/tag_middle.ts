import * as TagClass from '../models/tag';
import User from '../models/user';
import * as db from '../postgres';
import * as types from './useful/types';
import Utils from './useful/utils';
import {Const} from './useful/const';

export default class TagMiddle{

  public static changeTitle = (tag: TagClass.Tag, newTitle: string):Promise<types.Result>=>{
    return new Promise((resolve, reject)=>{
      db.tags.changeTitle(tag, newTitle)
      .then(result=>{
        resolve(new types.Result(true));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }

  public static createTag = (tag: TagClass.Tag):Promise<types.Result>=>{
    return new Promise((resolve, reject)=>{
      db.tags.createTag(tag)
      .then(result=>{
        /*use this 'hack' because that tag parameter has already everything we want it to be, it just misses
        the noteslength. We add them and we can send it back to the user.
        */
        tag.noteslength = 0;
        resolve(new types.TagResult(true, tag));
      })
      .catch(error=>{
        resolve(Utils.jsonErr(error));
      })
    })
  }


  public static removeTag = (tag: TagClass.Tag):Promise<types.Result>=>{
    return new Promise((resolve, reject)=>{
      db.tags.removeTag(tag)
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


  public static selectTagByTitle  = (tag: TagClass.Tag):Promise<types.Result>=>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagByTitle(tag)
        .then(result=>{
          resolve(new types.TagMinResult(true, result));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }


  public static selectTagsByTitleReg  = (user:User, title:string):Promise<types.Result>=>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagsByTitleReg(user, title)
        .then(tags=>{
          resolve(new types.AnyResult(true, tags));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }
  //
  // public static selectTagsFull  = (user:User)=>{
  //     return new Promise((resolve, reject)=>{
  //       db.tags.selectTagsFull(user)
  //       .then(tags=>{
  //         resolve(new types.AnyResult(true,tags));
  //       })
  //       .catch(error=>{
  //         resolve(Utils.jsonErr(error));
  //       })
  //     })
  // }

  public static selectAllTagsMin  = (user:User):Promise<types.Result>=>{
      return new Promise((resolve, reject)=>{
        db.tags.selectTagsMin(user)
        .then(tags=>{
          resolve(new types.AnyResult(true, tags));
        })
        .catch(error=>{
          resolve(Utils.jsonErr(error));
        })
      })
  }

}
