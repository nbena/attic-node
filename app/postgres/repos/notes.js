"use strict";
const sql_1 = require("../sql");
const TagClass = require("../../models/tag");
const const_1 = require("../../middles/useful/const");
let sql = sql_1.default.notes;
class Repository {
    constructor(db, pgp) {
        this.addTagsString = (note, tags, roles) => {
            let things = [];
            for (let i = 0; i < tags.length; i++) {
                things.push({
                    noteTitle: note.title,
                    tagTitle: tags[i].title,
                    role: roles[i],
                    userid: note.userid
                });
            }
            let res = this.pgp.helpers.insert(things, ['noteTitle', 'tagTitle', 'role', 'userid'], 'attic.notes_tags');
            res = res.replace('"attic.notes_tags"("noteTitle","tagTitle","role","userid")', "attic.notes_tags(noteTitle,tagTitle,role,userid)");
            return res;
        };
        this.addTags = (note, tags, roles) => {
            if (tags.length != roles.length) {
                throw new Error('mismatch');
            }
            return this.db.none(this.addTagsString(note, tags, roles));
        };
        this.changeLinks = (note, links) => {
            let values = [note.userid, note.title, links];
            return this.db.one(sql.changeLinks, values, (note) => { return note.result; });
        };
        this.changeText = (note, newText) => {
            let values = [note.userid, note.title, newText];
            return this.db.one(sql.changeText, values, (note) => { return note.result; });
        };
        this.changeTitle = (note, newTitle) => {
            let values = [note.userid, note.title, newTitle];
            return this.db.one(sql.changeTitle, values, (note) => { return note.result; });
        };
        this.createNoteAll = (note) => {
            let values = [
                note.userid,
                note.title,
                note.text,
                note.isdone,
                JSON.stringify(note.links)
            ];
            return this.db.one(sql.createNoteAll, values, (note) => { return note.result; });
        };
        this.createNote = (note) => {
            let values = [
                note.userid,
                note.title,
                note.text
            ];
            values.push(((note.isdone == null) ? false : note.isdone));
            values.push(((note.links == null) ? '[]' : note.links));
            console.log('values are');
            console.log(values);
            let queries = [];
            let tags = [];
            let roles = [];
            if (note.maintags != null && note.maintags.length != 0) {
                note.maintags.map((currentValue, currentIndex) => {
                    let tag = new TagClass.Tag();
                    tag.title = currentValue;
                    roles.push('mainTags');
                    tags.push(tag);
                });
            }
            if (note.maintags != null && note.othertags.length != 0) {
                note.othertags.map((currentValue, currentIndex) => {
                    let tag = new TagClass.Tag();
                    tag.title = currentValue;
                    roles.push('otherTags');
                    tags.push(tag);
                });
            }
            return this.db.tx(t => {
                queries.push(t.one(sql.createNoteAll, values));
                if (tags.length != 0) {
                    queries.push(t.none(this.addTagsString(note, tags, roles)));
                }
                return t.batch(queries);
            });
        };
        this.removeNote = (note) => {
            let values = note.getValues();
            return this.db.none(sql.removeNote, values);
        };
        this.removeTagsFromNote = (note, tags) => {
            let values = note.getValues();
            return this.db.tx(t => {
                let queries = [tags.length];
                for (let i = 0; i < tags.length; i++) {
                    let values = {
                        userid: note.userid,
                        noteTitle: note.title,
                        tagTitle: tags[i].title
                    };
                    queries.push(t.none(sql.removeTagsFromNote, values));
                }
                return t.batch(queries);
            });
        };
        this.selectNotesByTagsNoRole = (userid, tags) => {
            let values = Repository.getQueryNotesByTagsNoRole(userid, tags);
            return this.db.many(values);
        };
        this.selectNotesByTagsWithRole = (userid, tags, roles) => {
            if (tags.length != roles.length) {
                throw new TypeError(const_1.default.ERR_DIFF_LENGTH);
            }
            let values = Repository.getQueryNotesByTagsWithRole(userid, tags, roles);
            return this.db.many(values);
        };
        this.selectNoteByTitle = (note) => {
            return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note) => {
                return note;
            });
        };
        this.selectNotesByTitleReg = (userid, title) => {
            return this.db.many(sql.selectNotesByTitleReg, [userid, title]);
        };
        this.selectNotesByTextReg = (userid, text) => {
            return this.db.many(sql.selectNotesByTextReg, [userid, text]);
        };
        this.selectNotesFull = (userid) => {
            return this.db.many(sql.selectNotesFull, [userid]);
        };
        this.selectNotesMin = (user) => {
            return this.db.any(sql.selectNotesMin, [user.userid]);
        };
        this.setDone = (note, done) => {
            let values = [note.isdone, note.title, done];
            return this.db.one(sql.setDone, values, (note) => { return note.result; });
        };
        this.db = db;
        this.pgp = pgp;
    }
    static getQueryNotesByTagsNoRole(userid, tags) {
        let tagsTitle = tags.map((currentValue) => {
            return currentValue.title;
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userid + '\'');
        query = query.concat('and ( tagTitle=\'');
        let joined = tagsTitle.join('\' and tagTitle = \'');
        joined = joined.concat('\');');
        return query.concat(joined);
    }
    static getQueryNotesByTagsWithRole(userid, tags, roles) {
        let rolesTags = tags.map((currentValue, currentIndex) => {
            return { role: roles[currentIndex], title: currentValue.title };
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userid + '\'');
        query = query.concat('and ');
        let joined = '';
        for (let obj of rolesTags) {
            let tmp = '(tagTitle =\'' + obj.title + ' and role = \'' + obj.role + '\') and';
            joined = joined.substring(0, joined.lastIndexOf('and'));
        }
        joined = joined.concat('\);');
        query = query.concat(joined);
        return query;
    }
}
Repository.SELECT_NOTES_BY_TAGS_START = 'select json_build_object(\'title\', title, \'text\', \'isdone\', isDone, \'lastmodificationdate\', lastModificationDate, \'creationDate\', creationDate, \'links\', links) from attic.notes join attic.notes_tags as rel on title=noteTitle where rel.userid=\'';
exports.Repository = Repository;
//# sourceMappingURL=notes.js.map