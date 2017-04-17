"use strict";
const sql_1 = require("../sql");
const const_1 = require("../../middles/useful/const");
let sql = sql_1.default.notes;
class Repository {
    constructor(db, pgp) {
        this.addTags = (note, tags, roles) => {
            if (tags.length != roles.length) {
                throw new Error('mismatch');
            }
            return this.db.tx(t => {
                let queries = [tags.length];
                for (let i = 0; i < tags.length; i++) {
                    let values = [
                        note.userId,
                        note.title,
                        tags[i].title,
                        roles[i]
                    ];
                    queries.push(t.one(sql.addTags, values, (note) => { note.result; }));
                }
                return t.batch(queries);
            });
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
        this.createNoteWithNoLinks = (note) => {
            let values = [
                note.userId,
                note.title,
                note.text,
                note.isDone,
            ];
            return this.db.one(sql.createNoteWithNoLinks, values, (note) => { return note.result; });
        };
        this.createNoteWithNoIsDone = (note) => {
            let values = [
                note.userId,
                note.title,
                note.text,
                JSON.stringify(note.links)
            ];
            return this.db.one(sql.createNoteWithNoIsDone, values, (note) => { return note.result; });
        };
        this.createNoteWithNoLinksNoIsDone = (note) => {
            let values = [
                note.userId,
                note.title,
                note.text,
            ];
            return this.db.one(sql.createNoteWithNoLinksNoIsDone, values, (note) => { return note.result; });
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
            let values = note.getValues();
            return this.db.oneOrNone(sql.selectNoteByTitle, values, (note) => {
                console.log(note);
                return note;
            });
        };
        this.selectNotesByTitleReg = (userId, title) => {
            let values = {
                userId: userId,
                title: title
            };
            return this.db.many(sql.selectNotesByTitleReg, values);
        };
        this.selectNotesByTextReg = (userId, text) => {
            let values = {
                userId: userId,
                text: text
            };
            return this.db.many(sql.selectNotesByTextReg, values);
        };
        this.selectNotesFull = (userId) => {
            return this.db.many(sql.selectNotesFull, { userId: userId });
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