"use strict";
const AJV = require("ajv");
const add_tags_1 = require("./add_tags");
const change_links_1 = require("./change_links");
const change_text_1 = require("./change_text");
const change_title_1 = require("./change_title");
const create_note_1 = require("./create_note");
const notes_by_isdone_1 = require("./notes_by_isdone");
const notes_by_tags_no_role_1 = require("./notes_by_tags_no_role");
const notes_by_tags_with_role_1 = require("./notes_by_tags_with_role");
const notes_by_text_1 = require("./notes_by_text");
const remove_tags_1 = require("./remove_tags");
const set_done_1 = require("./set_done");
const utils_1 = require("../../middles/useful/utils");
const types_1 = require("../../middles/useful/types");
const index_1 = require("../index");
let ajv = new AJV({ useDefaults: true });
ajv.addSchema(add_tags_1.AddTagsSchema, index_1.Schemas.Notes.ADD_TAGS_SCHEMA);
ajv.addSchema(change_links_1.ChangeLinksSchema, index_1.Schemas.Notes.CHANGE_LINKS_SCHEMA);
ajv.addSchema(change_title_1.ChangeTitleSchema, index_1.Schemas.Notes.CHANGE_TITLE_SCHEMA);
ajv.addSchema(change_text_1.ChangeTextSchema, index_1.Schemas.Notes.CHANGE_TEXT_SCHEMA);
ajv.addSchema(create_note_1.CreateNoteSchema, index_1.Schemas.Notes.CREATE_NOTE_SCHEMA);
ajv.addSchema(notes_by_isdone_1.NotesByIsDoneSchema, index_1.Schemas.Notes.NOTES_BY_ISDONE_SCHEMA);
ajv.addSchema(notes_by_tags_no_role_1.NotesByTagsNoRoleSchema, index_1.Schemas.Notes.NOTES_BY_TAGS_NO_ROLE);
ajv.addSchema(notes_by_tags_with_role_1.NotesByTagsWithRoleSchema, index_1.Schemas.Notes.NOTES_BY_TAGS_WITH_ROLE);
ajv.addSchema(notes_by_text_1.NotesByTextSchema, index_1.Schemas.Notes.NOTES_BY_TEXT_SCHEMA);
ajv.addSchema(remove_tags_1.RemoveTagsSchema, index_1.Schemas.Notes.REMOVE_TAGS_SCHEMA);
ajv.addSchema(set_done_1.SetDoneSchema, index_1.Schemas.Notes.SET_DONE_SCHEMA);
function valid(schema) {
    return (req, res, next) => {
        let valid = ajv.validate(schema, req.body);
        if (valid) {
            return next();
        }
        else {
            res.json(utils_1.default.jsonErr(new types_1.JsonError(ajv.errorsText())));
        }
    };
}
module.exports = valid;
//# sourceMappingURL=index.js.map