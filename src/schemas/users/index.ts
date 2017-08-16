import * as AJV from 'ajv';
import * as express from 'express';

import Utils from '../../middles/useful/utils';
import { JsonError } from '../../middles/useful/types';
import  {Schemas} from '../index';

 //import { Loa } from './create_user';
 import { IsUserAvailableSchema } from './is_user_available';

let ajv = new AJV();

ajv.addSchema(IsUserAvailableSchema, Schemas.Users.IS_USER_VALID_SCHEMA);

function valid(schema:string):any{

  return (req:express.Request, res:express.Response, next)=>{
    let valid = ajv.validate(schema, req.body);
    if(valid){
      return next();
    }
    else{
      res.json(Utils.jsonErr(new JsonError(ajv.errorsText())));
    }
  }
}

export = valid;
