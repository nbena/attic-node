"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
const TagClass = require("../../models/tag");
let sql = sql_1.default.notes;
class Repository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    addTagsString(note, tags, roles) {
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
    }
    addTags(note, tags, roles) {
        if (tags.length != roles.length) {
            throw new Error('mismatch');
        }
        return this.db.none(this.addTagsString(note, tags, roles));
    }
    changeLinks(note, links) {
        let values = [note.userid, note.title, JSON.stringify(links)];
        return this.db.none(sql.changeLinks, values);
    }
    changeText(note, newText) {
        let values = [note.userid, note.title, newText];
        return this.db.none(sql.changeText, values);
    }
    changeTitle(note, newTitle) {
        return this.db.none(sql.changeTitle, [note.userid, note.title, newTitle]);
    }
    createNote(note) {
        let values = [
            note.userid,
            note.title,
            note.text,
            note.isdone,
            JSON.stringify(note.links),
            note.lastmodificationdate,
            note.creationdate
        ];
        let queries = [];
        let tags = [];
        let roles = [];
        if (note.maintags.length != 0) {
            note.maintags.map((currentValue, currentIndex) => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                roles.push('mainTags');
                tags.push(tag);
            });
        }
        if (note.othertags.length != 0) {
            note.othertags.map((currentValue, currentIndex) => {
                let tag = new TagClass.Tag();
                tag.title = currentValue;
                roles.push('otherTags');
                tags.push(tag);
            });
        }
        return this.db.tx(t => {
            queries.push(t.one(sql.createNoteWithDate, values));
            if (tags.length != 0) {
                queries.push(t.none(this.addTagsString(note, tags, roles)));
            }
            return t.batch(queries);
        });
    }
    removeNote(note) {
        let values = note.getValues();
        return this.db.none(sql.removeNote, values);
    }
    removeTagsString(length) {
        let base = Repository.REMOVE_TAGS_FROM_NOTES_START;
        let things = [];
        for (let i = 0; i < length; i++) {
            base += (' (tagtitle=$' + (i + 3) + ') or');
        }
        base = base.substr(0, base.length - 2);
        return base;
    }
    removeTagsFromNote(note, tags) {
        return this.db.none(this.removeTagsString(tags.length), [note.userid, note.title].concat(tags.map(obj => { return obj.title; })));
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
    selectNotesMinByTagsAnd(user, tags) {
        return this.db.any(sql.selectNotesMinByTagsAnd, [user.userid, tags.map(obj => { return obj.title; })]);
    }
    selectNotesMinByTagsOr(user, tags) {
        return this.db.any(sql.selectNotesMinByTagsOr, [user.userid].concat(tags.map(obj => { return obj.title; })));
    }
    selectNotesMinWithDateByTagsAnd(user, tags) {
        return this.db.any(sql.selectNotesMinWithDateByTagsAnd, [user.userid, tags.map(obj => { return obj.title; })]);
    }
    selectNotesMinWithDateByTagsOr(user, tags) {
        return this.db.any(sql.selectNotesMinWithDateByTagsOr, [user.userid].concat(tags.map(obj => { return obj.title; })));
    }
    selectNoteByTitle(note) {
        return this.db.oneOrNone(sql.selectNoteByTitle, note.getValues(), (note) => {
            return note;
        });
    }
    selectNotesMinByTitleReg(userid, title) {
        return this.db.any(sql.selectNotesMinByTitleReg, [userid, '%' + title + '%']);
    }
    selectNotesMinByTextReg(userid, text) {
        return this.db.any(sql.selectNotesMinByTextReg, [userid, '%' + text + '%']);
    }
    selectNotesMinWithDateByTitleReg(userid, title) {
        return this.db.any(sql.selectNotesMinWithDateByTitleReg, [userid, '%' + title + '%']);
    }
    selectNotesMinWithDateByTextReg(userid, text) {
        return this.db.any(sql.selectNotesMinWithDateByTextReg, [userid, '%' + text + '%']);
    }
    selectNotesFull(userid) {
        return this.db.any(sql.selectNotesFull, [userid]);
    }
    selectNotesMin(user) {
        return this.db.any(sql.selectNotesMin, [user.userid]);
    }
    selectNotesMinWithDate(user) {
        return this.db.any(sql.selectNotesMinWithDate, [user.userid]);
    }
    selectNotesMinWithDateByIsDone(user, isDone) {
        return this.db.any(sql.selectNotesMinWithDateByIsDone, [user.userid, isDone]);
    }
    selectNotesMinByIsDone(user, isDone) {
        return this.db.any(sql.selectNotesMinByIsDone, [user.userid, isDone]);
    }
    setDone(note, done) {
        let values = [note.isdone, note.title, done];
        return this.db.none(sql.setDone, values);
    }
}
Repository.SELECT_NOTES_BY_TAGS_START = 'select distinct notetitle as title from attic.notes_tags where attic.notes_tags.userId=\'';
Repository.REMOVE_TAGS_FROM_NOTES_START = 'delete from attic.notes_tags where userid=$1 and notetitle=$2 and ';
exports.Repository = Repository;
//# sourceMappingURL=notes.js.map