import * as AJV from 'ajv';
import * as express from 'express';

import { ChangeTitleSchema } from './change_title';
import { TagsByTitleRegSchema } from './tags_by_title_reg';


import Utils from '../../middles/useful/utils';
import { JsonError } from '../../middles/useful/types';
import  { Schemas } from '../index';

let ajv = new AJV();

ajv.addSchema(ChangeTitleSchema, Schemas.Tags.CHANGE_TITLE_SCHEMA);
ajv.addSchema(TagsByTitleRegSchema, Schemas.Tags.TAGS_BY_TITLE_REG_SCHEMA);


function valid(schema:string):any{

  return (req:express.Request, res:express.Response, next)=>{
    let valid = ajv.validate(schema, req.body);
    if(valid){
      return next();
    }
    else{
      /*
      res.status(400).json({
        error : ajv.errorsText()
      })*/
      res.json(Utils.jsonErr(new JsonError(ajv.errorsText())));
    }
  }
}

export = valid;
