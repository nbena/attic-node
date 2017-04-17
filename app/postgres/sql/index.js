"use strict";
const pg_promise_1 = require("pg-promise");
const path = require("path");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    notes: {
        addTags: link('notes/add_tags_to_note.sql'),
        changeLinks: link('notes/change_links.sql'),
        changeText: link('notes/change_text.sql'),
        changeTitle: link('notes/change_title.sql'),
        createNoteAll: link('notes/create_note_all.sql'),
        createNoteWithNoIsDone: link('notes/create_note_no_isdone.sql'),
        createNoteWithNoLinks: link('notes/create_note_no_links.sql'),
        createNoteWithNoLinksNoIsDone: link('notes/create_note_no_links_no_isdone.sql'),
        removeTagsFromNote: link('notes/remove_tags_from_note.sql'),
        removeNote: link('notes/remove_note.sql'),
        selectNoteByTitle: link('notes/select_note_by_title.sql'),
        selectNoteByTagNoRole: link('notes/select_notes_by_tag_no_role.sql'),
        selectNoteByTagWithRole: link('notes/select_notes_by_tag_role.sql'),
        selectNotesByTextReg: link('notes/select_notes_by_text_reg.sql'),
        selectNotesByTitleReg: link('notes/select_notes_by_title_reg.sql'),
        selectNotesFull: link('notes/select_notes_full.sql'),
        selectNotesMin: link('notes/select_notes_min.sql'),
        setDone: link('notes/set_done.sql')
    },
    tags: {
        changeTitle: link('tags/change_title.sql'),
        createTag: link('tags/create_tag.sql'),
        removeTag: link('tags/remove_tag.sql'),
        selectTagByTitle: link('tags/select_tag_by_title.sql'),
        selectTagsByTitle: link('tags/select_tags_by_title_reg.sql'),
        selectTagsFull: link('tags/select_tags_full.sql'),
        selectTagsMin: link('tags/select_tags_min.sql')
    },
    users: {
        createUser: link('users/create_user.sql'),
        removeUser: link('users/remove_user.sql'),
        selectByUserId: link('users/select.sql')
    }
};
function link(file) {
    var fullPath = path.join(__dirname, file);
    var options = {
        minify: true,
        params: {
            schema: 'attic'
        }
    };
    var queryFile = new pg_promise_1.QueryFile(fullPath, options);
    if (queryFile.error) {
        throw queryFile.error;
    }
    return queryFile;
}
//# sourceMappingURL=index.js.map