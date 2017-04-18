"use strict";
const note_1 = require("../../models/note");
const TagClass = require("../../models/tag");
const const_1 = require("../../middles/useful/const");
const utils_1 = require("../../middles/useful/utils");
const note_middle_1 = require("../../middles/note_middle");
class NoteEndpointParamCheck {
}
NoteEndpointParamCheck.title = (req) => {
    let result = null;
    if (!req.body.note.title || !req.body.note) {
        result = utils_1.default.jsonErr(new Error(const_1.default.NOTE_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.addTags = (req) => {
    let result = null;
    result = NoteEndpointParamCheck.title(req);
    console.log('is note instanceof?');
    console.log(JSON.stringify(req.body.note.mainTags instanceof Array));
    if (req.body.note.mainTags == null && req.body.note.otherTags == null) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TAGS_REQUIRED));
    }
    else if (req.body.note.mainTags != null) {
        if (req.body.note.mainTags instanceof Array == false) {
            result = utils_1.default.jsonErr(new Error(const_1.default.NO_ARR_INST));
        }
    }
    if (req.body.note.otherTags != null) {
        if (req.body.note.otherTags instanceof Array == false) {
            result = utils_1.default.jsonErr(new Error(const_1.default.NO_ARR_INST));
        }
    }
    return result;
};
NoteEndpointParamCheck.changeLinks = (req) => {
    let result = null;
    result = NoteEndpointParamCheck.title(req);
    if (!req.body.note.links || req.body.note.links instanceof Array) {
        result = utils_1.default.jsonErr(new Error(const_1.default.LINKS_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.changeText = (req) => {
    let result = null;
    result = NoteEndpointParamCheck.title(req);
    if (!req.body.note.text) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TEXT_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.changeTitle = (req) => {
    let result = null;
    result = NoteEndpointParamCheck.title(req);
    if (!req.body.note.newTitle) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TITLE_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.createNote = (req) => {
    let result = NoteEndpointParamCheck.changeText(req);
    if (req.body.note.mainTags) {
        if (req.body.note.mainTags instanceof Array == false) {
            result = utils_1.default.jsonErr(new Error(const_1.default.INVALID_NOTE));
        }
    }
    if (req.body.note.otherTags) {
        if (req.body.note.otherTags instanceof Array == false) {
            result = utils_1.default.jsonErr(new Error(const_1.default.INVALID_NOTE));
        }
    }
    return result;
};
NoteEndpointParamCheck.removeNote = (req) => {
    let result = null;
    if (!req.params.title) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TITLE_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.removeTagsFromNote = (req) => {
    let result = null;
    result = NoteEndpointParamCheck.title(req);
    if (!req.body.note.tags && req.body.note.tags instanceof Array) {
        result = utils_1.default.jsonErr(new Error(const_1.default.TAGS_REQUIRED));
    }
    return result;
};
NoteEndpointParamCheck.selectNotesByTagsNoRole = (req) => {
    return NoteEndpointParamCheck.removeTagsFromNote(req);
};
NoteEndpointParamCheck.selectNoteByTitle = (req) => {
    return NoteEndpointParamCheck.removeNote(req);
};
NoteEndpointParamCheck.selectNotesByTextReg = (req) => {
    return NoteEndpointParamCheck.changeText(req);
};
NoteEndpointParamCheck.selectNotesByTitleReg = (req) => {
    return NoteEndpointParamCheck.title(req);
};
NoteEndpointParamCheck.selectNotesByTagsWithRole = (req) => {
    return NoteEndpointParamCheck.addTags(req);
};
NoteEndpointParamCheck.setDone = (req) => {
    let result = NoteEndpointParamCheck.title(req);
    if (!req.body.note.isDone) {
        result = utils_1.default.jsonErr(new Error(const_1.default.IS_DONE_REQUIRED));
    }
    return result;
};
class NoteEndpoint {
}
NoteEndpoint.addTags = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tags;
    let tagsTemp;
    let roles;
    let result;
    let note;
    let check = NoteEndpointParamCheck.addTags(req);
    if (check != null) {
        res.json(check);
        return;
    }
    note = new note_1.default();
    tags = [];
    roles = [];
    note.title = req.body.note.title;
    note.userId = user.userId;
    if (req.body.note.mainTags) {
        req.body.note.mainTags.map((currentValue, currentIndex) => {
            let tag = new TagClass.Tag();
            tag.title = currentValue;
            tags.push(tag);
            roles.push('mainTags');
        });
    }
    if (req.body.note.otherTags) {
        req.body.note.otherTags.map((currentValue, currentIndex) => {
            let tag = new TagClass.Tag();
            tag.title = currentValue;
            tags.push(tag);
            roles.push('otherTags');
        });
    }
    result = note_middle_1.default.addTags(note, tags, roles);
    result.then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectAllNotesMin = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    note_middle_1.default.selectAllNotesMin(user)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.changeLinks = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let links;
    let result = NoteEndpointParamCheck.changeLinks(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.title = req.body.note.title;
    links = req.body.note.links;
    note.userId = user.userId;
    note_middle_1.default.changeLinks(note, links)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.changeText = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let text;
    let result = NoteEndpointParamCheck.changeText(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.title = req.body.note.title;
    text = req.body.note.text;
    note.userId = user.userId;
    note_middle_1.default.changeText(note, text)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.changeTitle = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let newTitle;
    let result = NoteEndpointParamCheck.changeTitle(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.title = req.body.note.title;
    newTitle = req.body.note.newTitle;
    note.userId = user.userId;
    note_middle_1.default.changeTitle(note, newTitle)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.createNote = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let result = NoteEndpointParamCheck.createNote(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.userId = user.userId;
    note.title = req.body.note.title;
    note.text = req.body.note.text;
    note.isDone = ((req.body.note.isDone) ? req.body.note.isDone : null);
    note.links = ((req.body.note.links) ? req.body.note.links : null);
    note.mainTags = ((req.body.note.mainTags) ? req.body.note.mainTags : null);
    note.otherTags = ((req.body.note.otherTags) ? req.body.note.otherTags : null);
    note_middle_1.default.createNote(note)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.removeNote = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let result = NoteEndpointParamCheck.removeNote(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.userId = user.userId;
    note.title = req.params.title;
    note_middle_1.default.removeNote(note)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.removeTagsFromNote = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let tags = [];
    let result = NoteEndpointParamCheck.removeTagsFromNote(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.title = req.body.note.title;
    note.userId = user.userId;
    req.body.note.tags.map((currentValue) => {
        let t = new TagClass.Tag();
        t.title = currentValue;
        tags.push(t);
    });
    note_middle_1.default.removeTagsFromNote(note, tags)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectNotesByTagsNoRole = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tags = [];
    let result = NoteEndpointParamCheck.selectNotesByTagsNoRole(req);
    if (result != null) {
        res.json(result);
        return;
    }
    req.body.note.tags.map((currentValue) => {
        let t = new TagClass.Tag();
        t.title = currentValue;
        tags.push(t);
    });
    note_middle_1.default.selectNotesByTagsNoRole(user.userId, tags)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectNotesByTagsWithRole = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let tags = [];
    let roles = [];
    let result = NoteEndpointParamCheck.selectNotesByTagsWithRole(req);
    if (result != null) {
        res.json(result);
        return;
    }
    if (req.body.note.mainTags) {
        req.body.mainTags.map((currentValue, currentIndex) => {
            let tag = new TagClass.Tag();
            tag.title = currentValue;
            tags.push(tag);
            roles.push('mainTags');
        });
    }
    if (req.body.note.otherTags) {
        req.body.otherTags.map((currentValue, currentIndex) => {
            let tag = new TagClass.Tag();
            tag.title = currentValue;
            tags.push(tag);
            roles.push('otherTags');
        });
    }
    note_middle_1.default.selectNotesByTagsWithRole(user.userId, tags, roles)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectNoteByTitle = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let note;
    let result = NoteEndpointParamCheck.selectNoteByTitle(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.title = req.params.title;
    note.userId = user.userId;
    note_middle_1.default.selectNoteByTitle(note)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectNoteByTitleReg = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let title;
    let result = NoteEndpointParamCheck.selectNotesByTitleReg(req);
    if (result != null) {
        res.json(result);
        return;
    }
    title = req.body.note.title;
    note_middle_1.default.selectNotesByTitleReg(user.userId, title)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.selectNoteByTextReg = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let text;
    let result = NoteEndpointParamCheck.selectNotesByTextReg(req);
    if (result != null) {
        res.json(result);
        return;
    }
    text = req.body.note.title;
    note_middle_1.default.selectNotesByTextReg(user.userId, text)
        .then(result => {
        res.json(result);
    });
};
NoteEndpoint.setDone = (req, res, next) => {
    let user = utils_1.default.extractUser(req);
    let isDone;
    let note;
    let result = NoteEndpointParamCheck.setDone(req);
    if (result != null) {
        res.json(result);
        return;
    }
    note = new note_1.default();
    note.userId = user.userId;
    note.title = req.body.note.title;
    isDone = req.body.note.isDone;
    note_middle_1.default.setDone(note, isDone)
        .then(result => {
        res.json(result);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoteEndpoint;
//# sourceMappingURL=note_endpoint.js.map