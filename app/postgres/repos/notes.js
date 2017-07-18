"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                    notetitle: note.title,
                    tagtitle: tags[i].title,
                    role: roles[i],
                    userid: note.userid
                });
            }
            let table = new this.pgp.helpers.TableName('notes_tags', 'attic');
            return this.pgp.helpers.insert(things, ['notetitle', 'tagtitle', 'role', 'userid'], table);
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
            values.push(note.isdone);
            values.push(JSON.stringify(((note.links == null) ? '[]' : note.links)));
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
            if (note.othertags != null && note.othertags.length != 0) {
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
        this.selectNotesByTagsNoRole = (userid, tags, and) => {
            let values = Repository.getQueryNotesByTagsNoRole(userid, tags, and);
            console.log('the query is:');
            console.log(values);
            return this.db.many(values);
        };
        this.selectNotesByTagsWithRole = (userid, tags, roles, and) => {
            if (tags.length != roles.length) {
                throw new TypeError(const_1.Const.ERR_DIFF_LENGTH);
            }
            let values = Repository.getQueryNotesByTagsWithRole(userid, tags, roles, and);
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
    changeTitle(note, newTitle) {
        return this.db.one(sql.changeTitle, [note.userid, note.title, newTitle], (note) => { return note.result; });
    }
    static getQueryNotesByTagsNoRole(userid, tags, and) {
        let tagsTitle = tags.map((currentValue) => {
            return currentValue.title;
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userid + '\'');
        query = query.concat('and ( tagtitle=\'');
        let joined;
        if (and) {
            joined = tagsTitle.join('\' and tagtitle = \'');
        }
        else {
            joined = tagsTitle.join('\' or tagtitle = \'');
        }
        joined = joined.concat('\');');
        return query.concat(joined);
    }
    static getQueryNotesByTagsWithRole(userid, tags, roles, and) {
        let rolesTags = tags.map((currentValue, currentIndex) => {
            return { role: roles[currentIndex], title: currentValue.title };
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userid + '\'');
        query = query.concat('and ');
        let joined = '';
        let tmp;
        for (let obj of rolesTags) {
            if (and) {
                tmp = '(tagtitle =\'' + obj.title + ' and role = \'' + obj.role + '\') and';
            }
            else {
                tmp = '(tagtitle =\'' + obj.title + ' and role = \'' + obj.role + '\') or';
            }
            joined = joined.substring(0, joined.lastIndexOf('or'));
        }
        joined = joined.concat('\);');
        query = query.concat(joined);
        return query;
    }
}
Repository.SELECT_NOTES_BY_TAGS_START = 'select distinct notetitle as title from attic.notes_tags where attic.notes_tags.userId=\'';
exports.Repository = Repository;
//# sourceMappingURL=notes.js.map