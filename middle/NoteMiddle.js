var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');
var Const = require('../public/javascripts/Const.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Utils = require('../public/javascripts/Utils');
var ParamHelpMiddle = require('../public/javascripts/ParamHelpMiddle');

function allNotesPopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.allNotesPopulated = allNotesPopulated;

function allNotesUnpopulated(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  Note.find({_userId: userId})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.allNotesUnpopulated = allNotesUnpopulated;

function notesByTitleRegexPopulated(userId, title, cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId, title:{$regex: title}})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTitleRegexPopulated = notesByTitleRegexPopulated;

function notesByTitleRegexUnpopulated(userId, title, cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId, title:{$regex: title}})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTitleRegexUnpopulated = notesByTitleRegexUnpopulated;


function updateTitle(userId, id, title, cb){
  var ret = ParamHelpMiddle.notesUpdateTitleCheck(userId, id, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOneAndUpdate({_userId: userId, _id: id},
    {title: title})
    .exec()
    .then(function(result){
      result={ok: true};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.updateTitle=updateTitle;



function notesByTitlePopulated(userId, title, cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOne({_userId: userId, title:title})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTitlePopulated = notesByTitlePopulated;

function notesByTitleUnpopulated(userId, title, cb){
  var ret = ParamHelpMiddle.byTitleCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOne({_userId: userId, title:title})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTitleUnpopulated = notesByTitleUnpopulated;

function notesByTextPopulated(userId, text, cb){
  var ret = ParamHelpMiddle.notesByTextCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId, text: {$regex: text}})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTextPopulated = notesByTextPopulated;

function notesByTextUnpopulated(userId, text, cb){
  var ret = ParamHelpMiddle.notesByTextCheck(userId, title, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId, text: {$regex: text}})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.notesByTextUnpopulated = notesByTextUnpopulated;

function noteByIdPopulated(userId, id, cb){
  var ret = ParamHelpMiddle.userIdIdCheck(userId, id, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOne({_userId: userId, _id: id})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      result={ok:true, result: result};
      return cb(result);
    })
    .catch(function(err){
      result={ok:false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.noteByIdPopulated=noteByIdPopulated;

function getQueryOnNotesByTagsPopulated(userId, mainTags, otherTags, tags){
  if(mainTags && otherTags){
    return Note.find({mainTags: {$elemMatch: {$in: mainTags}}, otherTags: {$elemMatch: {$in: othetTags}},
      _userId: userId})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(mainTags){
    return Note.find({mainTags: {$elemMatch: {$in: mainTags}},
      _userId: userId,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(otherTags){
    return Note.find({otherTags: {$elemMatch: {$in: otherTags}},
      _userId: userId,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else{
    return Note.find({$or: [{mainTags: {$elemMatch: {$in: tags}}}, {otherTags: {$elemMatch: {$in: tags}}}],
      _userId: userId,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec()
  }
}


function notesByTagPopulated(userId, mainTags, otherTags, tags, cb){
  var ret = ParamHelpMiddle.notesByTagCheck(userId, mainTags, otherTags, tags, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  getQueryOnNotesByTagsPopulated(userId, mainTags, otherTags, tags)
  .then(function(result){
    result={ok:true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok:false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.notesByTagPopulated = notesByTagPopulated;

function getQueryOnNotesByTagsUnpopulated(userId, mainTags, otherTags, tags){
  if(mainTags && otherTags){
    return Note.find({mainTags: {$elemMatch: {$in: mainTags}}, otherTags: {$elemMatch: {$in: othetTags}},
      _userId: userId})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(mainTags){
    return Note.find({mainTags: {$elemMatch: {$in: mainTags}},
      _userId: userId,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(otherTags){
    return Note.find({otherTags: {$elemMatch: {$in: otherTags}},
      _userId: userId,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else{
    return Note.find({$or: [{mainTags: {$elemMatch: {$in: tags}}}, {otherTags: {$elemMatch: {$in: tags}}}],
      _userId: userId,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }
}


function notesByTagUnpopulated(userId, mainTags, otherTags, tags, cb){
  var ret = ParamHelpMiddle.notesByTagCheck(userId, mainTags, otherTags, tags, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  getQueryOnNotesByTagsUnpopulated(userId, mainTags, otherTags, tags)
  .then(function(result){
    result={ok:true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok:false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.notesByTagUnpopulated = notesByTagUnpopulated;

function getNoteObject(note, id){
  var mongoNote = new Note({
    title: note.title,
    text: note.text,
    _userId: id,
    _id: mongoose.Types.ObjectId(),
    mainTags: note.mainTags,
    otherTags: note.otherTags
  });
  if(note.links){
    for(var i=0;i<note.links.length;i++){
      mongoNote.links.addToSet(note.links[i]);
    }
  }
  if(note.isDone){
    mongoNote.isDone=note.isDone;
  }
  return mongoNote;
}

function createNote(userId, note, cb){
  var ret = ParamHelpMiddle.userIdNoteCheck(userId, note, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  var tags = note.mainTags.concat(note.otherTags);
  var note = getNoteObject(note, userId);

  note.save()
  .then(function(result){
    result={ok: true, result: result};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.createNote = createNote;

function removeNote(userId, id, cb){
  var ret = ParamHelpMiddle.userIdIdCheck(userId, id, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOne({_userId: userId, _id: id}).exec()
  .then(function(note){
    if(note){
      return note.remove();
    }else{
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .then(function(result){
    result={ok: true};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  })
}
module.exports.removeNote = removeNote;


function removeAllNotes(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.remove({_userId: userId}).exec()
  .then(function(result){
    return Tag.update({_userId: userId},
      {notes:[]},
      {multi: true}).exec();
  })
  .then(function(secondResult){
    result={ok: true};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.removeAllNotes = removeAllNotes;

function updateText(userId, id, text, cb){
  var ret = ParamHelpMiddle.notesUpdateTextCheck(userId, id, text, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOneAndUpdate({_userId: userId, _id: id},
    {text: text}).exec()
    .then(function(result){
      if(result){
        result={ok: true};
        return cb(result);
      }else{
        throw new Error(Const.ERR_NOTE_NOT_FOUND);
      }
    })
    .catch(function(err){
      result={ok: false, msg: Utils.jsonErr(err)};
      return cb(result);
    });
}
module.exports.updateText = updateText;


function getQueryAddTags(mainTags, otherTags, data){
  if(mainTags && otherTags){
    for(var i=0;i<mainTags.length;i++){
      data.mainTags.addToSet(mainTags[i]);
    }
    for(var i=0;i<otherTags.length;i++){
      data.otherTags.addToSet(otherTags[i]);
    }
  }
  //add if not present
  else if(mainTags){
    for(var i=0;i<mainTags.length;i++){
      data.mainTags.addToSet(mainTags[i]);
    }
  }
  else if(otherTags){
    for(var i=0;i<otherTags.length;i++){
      data.otherTags.addToSet(otherTags[i]);
    }
  }
  return data.save();
}


function addTags(userId, id, mainTags, otherTags, tags, cb){
  var ret = ParamHelpMiddle.notesAddRemoveTagsCheck(userId, id, mainTags, otherTags, tags, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  var noteFind;
  Note.findOne({_userId: userId, _id: id}).exec()
  .then(function(note){
    if(note){
      noteFind=note;
      return Tag.find({_userId: userId, _id: {$in: tags}}).exec()
    }else{
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .then(function(dataTags){
    if(dataTags.length==tags.length){
        return getQueryAddTags(mainTags, otherTags, noteFind);
    }else{
      throw new Error(Const.ERR_TAG_NOT_FOUND);
    }
  })
  .then(function(savingResult){ //here if all is allright.
    result={ok: true};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.addTags = addTags;

function getQueryRemoveTags(mainTags, otherTags, data){
  if(mainTags && otherTags){
    for(var i=0;i<mainTags.length;i++){
      data.mainTags.pull(mainTags[i]);
    }
    for(var i=0;i<otherTags.length;i++){
      data.otherTags.pull(otherTags[i]);
    }
  }else if(mainTags){
    for(var i=0;i<mainTags.length;i++){
      data.mainTags.pull(mainTags[i]);
    }
  }else{
    for(var i=0;i<otherTags.length;i++){
      data.otherTags.pull(otherTags[i]);
    }
  }
  return data.save();
}

function removeTags(userId, id, mainTags, otherTags, tags, cb){
  var ret = ParamHelpMiddle.notesAddRemoveTagsCheck(userId, id, mainTags, otherTags, tags, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  var noteFind;
  Note.findOne({_userId: userId, _id: id}).exec()
  .then(function(note){
    if(note){
      noteFind=note;
      return Tag.find({_userId: userId, _id: {$in: tags}}).exec()
    }else{
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .then(function(dataTags){
    if(dataTags.length==tags.length){
        return getQueryRemoveTags(mainTags, otherTags, noteFind);
    }else{
      throw new Error(Const.ERR_TAG_NOT_FOUND);
    }
  })
  .then(function(savingResult){ //here if all is allright.
    result={ok: true};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.removeTags = removeTags;

function countNotes(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result= {};
  Note.count({_userId: userId})
  .then(function(data){
    result={ok: true, noteCount: data};
    return cb(result);
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.countNotes = countNotes;


function addLinks(userId, id, links, cb){
  var ret = ParamHelpMiddle.notesAddRemoveLinksCheck(userId, id, links, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOneAndUpdate({_userId: userId, _id: id},
    {$addToSet:{links: {$each: links}}}).exec()
  .then(function(note){
    if(note){
      result={ok: true};
      return cb(result);
    }else{
      // res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
module.exports.adLinks = addLinks;

function removeLinks(userId, id, links, cb){
  var ret = ParamHelpMiddle.notesAddRemoveLinksCheck(userId, id, links, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOneAndUpdate({_userId: userId, _id: id},
    {$pullAll:{links: links}}).exec()
  .then(function(note){
    if(note){
      result={ok: true};
      return cb(result);
    }else{
      // res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}

module.exports.removeLinks = removeLinks;

function setDone(userId, id, done, cb){
  var ret = ParamHelp.notesDoneCheck(userId, id, done, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.findOneAndUpdate({_userId: userId, _id:id},
    {isDone: done}).exec()
  .then(function(note){
    if(note){
      result={ok:true};
      return cb(result);
    }else{
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .catch(function(err){
    result={ok: false, msg: Utils.jsonErr(err)};
    return cb(result);
  });
}
  module.exports.setDone = setDone;

function allNotesMin(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId},
            {_id: 1, title:1}).exec()
            .then(function(data){
              result={ok: true, result: data};
              return cb(result);
            })
            .catch(function(err){
              result={ok: false, msg: Utils.jsonErr(err)};
              return cb(result);
            });
}

module.exports.allNotesMin = allNotesMin;

function allNotesIds(userId, cb){
  var ret = ParamHelpMiddle.justCbUserIdCheck(userId, cb);
  if(ret!=""){
    throw new TypeError(ret);
  }
  var result = {};
  Note.find({_userId: userId},
            {_id: 1}).exec()
            .then(function(data){
              result={ok: true, result: data};
              return cb(result);
            })
            .catch(function(err){
              result={ok: false, msg: Utils.jsonErr(err)};
              return cb(result);
            });
}

module.exports.allNotesIds = allNotesIds;
