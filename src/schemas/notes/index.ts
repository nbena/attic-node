//import {Validators, ValidationError} from 'express-json-validator-middleware';
import * as AJV from 'ajv';
import * as express from 'express';


import { AddTagsSchema } from './add_tags';
import { ChangeLinksSchema } from './change_links';
import { ChangeTextSchema } from './change_text';
import { ChangeTitleSchema } from './change_title';
import { CreateNoteSchema } from './create_note';
import { NotesByTagsNoRoleSchema } from './notes_by_tags_no_role';
import { NotesByTagsWithRoleSchema } from './notes_by_tags_with_role';
import { NotesByTextSchema } from './notes_by_text';
import { NotesByTitleRegSchema } from './notes_by_title_reg';
import { RemoveTagsSchema } from './remove_tags';
import { SetDoneSchema } from './set_done';


import Utils from '../../middles/useful/utils';
import { JsonError } from '../../middles/useful/types';
import  {Schemas} from '../index';

let ajv = new AJV({useDefaults:true});

ajv.addSchema(AddTagsSchema, Schemas.Notes.ADD_TAGS_SCHEMA);
ajv.addSchema(ChangeLinksSchema, Schemas.Notes.CHANGE_LINKS_SCHEMA);
ajv.addSchema(ChangeTitleSchema, Schemas.Notes.CHANGE_TITLE_SCHEMA);
ajv.addSchema(ChangeTextSchema,Schemas.Notes.CHANGE_TEXT_SCHEMA);
ajv.addSchema(CreateNoteSchema, Schemas.Notes.CREATE_NOTE_SCHEMA);
ajv.addSchema(NotesByTagsNoRoleSchema, Schemas.Notes.NOTES_BY_TAGS_NO_ROLE);
ajv.addSchema(NotesByTagsWithRoleSchema, Schemas.Notes.NOTES_BY_TAGS_WITH_ROLE);
ajv.addSchema(NotesByTextSchema, Schemas.Notes.NOTES_BY_TEXT_SCHEMA);
ajv.addSchema(RemoveTagsSchema, Schemas.Notes.REMOVE_TAGS_SCHEMA);
ajv.addSchema(SetDoneSchema, Schemas.Notes.SET_DONE_SCHEMA);

function valid(schema:string):any{

  return (req:express.Request, res:express.Response, next)=>{
    let valid = ajv.validate(schema, req.body);
    // console.log(valid);
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
