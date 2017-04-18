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
                    userId: note.userId
                });
            }
            let res = this.pgp.helpers.insert(things, ['noteTitle', 'tagTitle', 'role', 'userId'], 'attic.notes_tags');
            res = res.replace('"attic.notes_tags"("noteTitle","tagTitle","role","userId")', "attic.notes_tags(noteTitle,tagTitle,role,userId)");
            return res;
        };
        this.addTags = (note, tags, roles) => {
            if (tags.length != roles.length) {
                throw new Error('mismatch');
            }
            return this.db.none(this.addTagsString(note, tags, roles));
        };
        this.changeLinks = (note, links) => {
            let values = [note.userId, note.title, links];
            return this.db.one(sql.changeLinks, values, (note) => { return note.result; });
        };
        this.changeText = (note, newText) => {
            let values = [note.userId, note.title, newText];
            return this.db.one(sql.changeText, values, (note) => { return note.result; });
        };
        this.changeTitle = (note, newTitle) => {
            let values = [note.userId, note.title, newTitle];
            return this.db.one(sql.changeTitle, values, (note) => { return note.result; });
        };
        this.createNoteAll = (note) => {
            let values = [
                note.userId,
                note.title,
                note.text,
                note.isDone,
                JSON.stringify(note.links)
            ];
            return this.db.one(sql.createNoteAll, values, (note) => { return note.result; });
        };
        this.createNote = (note) => {
            let values = [
                note.userId,
                note.title,
                note.text
            ];
            values.push(((note.isDone == null) ? false : note.isDone));
            values.push(((note.links == null) ? '[]' : note.links));
            console.log('values are');
            console.log(values);
            let queries = [];
            let tags = [];
            let roles = [];
            if (note.mainTags != null && note.mainTags.length != 0) {
                note.mainTags.map((currentValue, currentIndex) => {
                    let tag = new TagClass.Tag();
                    tag.title = currentValue;
                    roles.push('mainTags');
                    tags.push(tag);
                });
            }
            if (note.mainTags != null && note.otherTags.length != 0) {
                note.otherTags.map((currentValue, currentIndex) => {
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
                        userId: note.userId,
                        noteTitle: note.title,
                        tagTitle: tags[i].title
                    };
                    queries.push(t.none(sql.removeTagsFromNote, values));
                }
                return t.batch(queries);
            });
        };
        this.selectNotesByTagsNoRole = (userId, tags) => {
            let values = Repository.getQueryNotesByTagsNoRole(userId, tags);
            return this.db.many(values);
        };
        this.selectNotesByTagsWithRole = (userId, tags, roles) => {
            if (tags.length != roles.length) {
                throw new TypeError(const_1.default.ERR_DIFF_LENGTH);
            }
            let values = Repository.getQueryNotesByTagsWithRole(userId, tags, roles);
            return this.db.many(values);
        };
        this.selectNoteByTitle = (note) => {
            return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note) => {
                return note;
            });
        };
        this.selectNotesByTitleReg = (userId, title) => {
            return this.db.many(sql.selectNotesByTitleReg, [userId, title]);
        };
        this.selectNotesByTextReg = (userId, text) => {
            return this.db.many(sql.selectNotesByTextReg, [userId, text]);
        };
        this.selectNotesFull = (userId) => {
            return this.db.many(sql.selectNotesFull, [userId]);
        };
        this.selectNotesMin = (user) => {
            return this.db.any(sql.selectNotesMin, [user.userId]);
        };
        this.setDone = (note, done) => {
            let values = [note.isDone, note.title, done];
            return this.db.one(sql.setDone, values, (note) => { return note.result; });
        };
        this.db = db;
        this.pgp = pgp;
    }
    static getQueryNotesByTagsNoRole(userId, tags) {
        let tagsTitle = tags.map((currentValue) => {
            return currentValue.title;
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userId + '\'');
        query = query.concat('and ( tagTitle=\'');
        let joined = tagsTitle.join('\' and tagTitle = \'');
        joined = joined.concat('\');');
        return query.concat(joined);
    }
    static getQueryNotesByTagsWithRole(userId, tags, roles) {
        let rolesTags = tags.map((currentValue, currentIndex) => {
            return { role: roles[currentIndex], title: currentValue.title };
        });
        let query = Repository.SELECT_NOTES_BY_TAGS_START;
        query = query.concat(userId + '\'');
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
Repository.SELECT_NOTES_BY_TAGS_START = 'select json_array(\'{title, text, isDone, creationDate, lastModficationDate, links}\', array[title, text, isDone:: text, creationDate::text, lastModficationDate::text, links::text]) from attic.notes join attic.notes_tags as rel on title=noteTitle where rel.userId=\'';
exports.Repository = Repository;
//# sourceMappingURL=notes.js.map