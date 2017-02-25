var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');
// var UserController = ('./UserController');
// var passport = require('passport');
var AuthController = require('./AuthController.js');
var Const = require('../public/javascripts/Const.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Utils = require('../public/javascripts/Utils');
var ParamHelp = require('../public/javascripts/ParamHelp');


//all notes
function allNotesPopulatedBody(req, res, next){
  Note.find({_userId: req.user._id})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      res.json({ok:true, result: result});
    })
    .catch(function(err){
      res.json({ok:false, msg: Utils.jsonErr(err)});
    });
}

function allNotesUnpopulatedBody(req, res, next){
  Note.find({_userId: req.user._id})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    .exec()
    .then(function(result){
      res.json({ok:true, result: result});
    })
    .catch(function(err){
      res.json({ok:false, msg: Utils.jsonErr(err)});
    });
}

function allNotesWrapper(req, res, next, populate){
  var ret = ParamHelp.userPopulateCheck(req, res, populate);
  if(!ret){
    return;
  }
  if(populate){
    allNotesPopulatedBody(req, res, next);
  }else{
    allNotesUnpopulatedBody(req, res, next);
  }
}

function allNotesPopulated(req, res, next){
  allNotesWrapper(req, res, next, true);
}

module.exports.allNotesPopulated = allNotesPopulated;

function allNotesUnpopulated(req, res, next){
  allNotesWrapper(req, res, next, false);
}

module.exports.allNotesUnpopulated = allNotesUnpopulated;






function noteByTitleRegexPopulatedBody(req, res, next){
  Note.find({_userId: req.user._id, title:{$regex: req.body.title}})
    .populate("mainTags")
    .populate("otherTags")
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    // .populate("_userId", {_id:1, e_mail: 1})
    .exec()
    .then(function(result){
      res.json({ok:true, result: result});
    })
    .catch(function(err){
      res.json({ok:false, msg: Utils.jsonErr(err)});
    });
}

function noteByTitleRegexUnpopulatedBody(req, res, next){
  Note.find({_userId: req.user._id, title:{$regex: req.body.title}})
    .sort({title:1, lastModificationDate: -1, creationDate: -1})
    // .populate("_userId", {_id:1, e_mail: 1})
    .exec()
    .then(function(result){
      res.json({ok:true, result: result});
    })
    .catch(function(err){
      res.json({ok:false, msg: Utils.jsonErr(err)});
    });
}


function noteByTitleRegexWrapper(req, res, next, populate){
  var ret = ParamHelp.byTitleCheck(req, res, populate);
  if(!ret){
    return;
  }
  if(populate){
    noteByTitleRegexPopulatedBody(req, res, next);
  }else{
    noteByTitleRegexUnpopulatedBody(req, res, next);
  }
}

function noteByTitleRegexPopulated(req, res, next){
  noteByTitleRegexWrapper(req, res, next, true);
}

module.exports.noteByTitleRegexPopulated = noteByTitleRegexPopulated;


function noteByTitleRegexUnpopulated(req, res, next){
  noteByTitleRegexWrapper(req, res, next, false);
}

module.exports.noteByTitleRegexUnpopulated = noteByTitleRegexUnpopulated;







function noteByTitlePopulatedBody(req, res, next){
      Note.findOne({_userId: req.user._id, title:req.body.title})
        .populate("mainTags")
        .populate("otherTags")
        .sort({title:1, lastModificationDate: -1, creationDate: -1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}



function noteByTitleUnpopulatedBody(req, res, next){
      Note.findOne({_userId: req.user._id, title:req.body.title})
        .sort({title:1, lastModificationDate: -1, creationDate: -1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}

function noteByTitleWrapper(req, res, next, populate){
  var ret = ParamHelp.byTitleCheck(req, res, populate);
  if(!ret){
    return;
  }
  if(populate){
    noteByTitlePopulatedBody(req, res, next);
  }else{
    noteByTitleUnpopulatedBody(req, res, next);
  }
}



function noteByTitlePopulated(req, res, next){
  noteByTitleWrapper(req, res, next, true);
}
module.exports.noteByTitlePopulated = noteByTitlePopulated;

function noteByTitleUnpopulated(req, res, next){
  noteByTitleWrapper(req, res, next, false);
}
module.exports.noteByTitleUnpopulated = noteByTitleUnpopulated;






function noteByTextPopulatedBody(req, res, next){
      Note.find({_userId: req.user._id, text: {$regex: req.body.text}})
        .populate("mainTags")
        .populate("otherTags")
        // .populate("_userId", {_id:1, e_mail:1})
        .sort({title:1, lastModificationDate: -1, creationDate: -1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}


function noteByTextUnpopulatedBody(req, res, next){
      Note.find({_userId: req.user._id, text: {$regex: req.body.text}})
        .sort({title:1, lastModificationDate: -1, creationDate: -1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}

function noteByTextWrapper(req, res, next, populate){
  var ret = ParamHelp.notesByTextCheck(req, re, populate);
  if(!ret){
    return;
  }
  if(populate){
    noteByTextPopulatedBody(req, res, next);
  }else{
    noteByTextUnpopulatedBody(req, res, next);
  }
}


function noteByTextPopulated(req, res, next){
  noteByTextWrapper(req, res, next, true);
}

module.exports.noteByTextPopulated = noteByTextPopulated;

function noteByTextUnpopulated(req, res, next){
  noteByTextWrapper(req, res, next, false);
}

module.exports.noteByTextUnpopulated = noteByTextUnpopulated;


function noteByIdPopulated(req, res, next){
  var ret = ParamHelp.byIdCheck(req, res);
  if(!ret){
    return;
  }
  var par = ParamHelp.Getter.getId(req);
      Note.findOne({_userId: req.user._id, _id: par})
        .populate("mainTags")
        .populate("otherTags")
        .sort({title:1, lastModificationDate: -1, creationDate: -1})
        .exec()
        .then(function(result){
          res.json({ok:true, result: result});
        })
        .catch(function(err){
          res.json({ok:false, msg: Utils.jsonErr(err)});
        });
}

module.exports.noteByIdPopulated = noteByIdPopulated;


function notesByTagPopulatedQueryBody(req){
  if(req.body.mainTags && req.body.otherTags){
    return Note.find({mainTags: {$elemMatch: {$in: req.body.mainTags}}, otherTags: {$elemMatch: {$in: req.body.othetTags}},
      _userId: req.user._id})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(req.body.mainTags){
    return Note.find({mainTags: {$elemMatch: {$in: req.body.mainTags}},
      _userId: req.user._id,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(req.body.otherTags){
    return Note.find({otherTags: {$elemMatch: {$in: req.body.otherTags}},
      _userId: req.user._id,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else{
    return Note.find({$or: [{mainTags: {$elemMatch: {$in: req.body.tags}}}, {otherTags: {$elemMatch: {$in: req.body.tags}}}],
      _userId: req.user._id,})
      .populate("mainTags")
      .populate("otherTags")
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec()
  }
}

function notesByTagUnpopulatedQueryBody(req){
  if(req.body.mainTags && req.body.otherTags){
    return Note.find({mainTags: {$elemMatch: {$in: req.body.mainTags}}, otherTags: {$elemMatch: {$in: req.body.othetTags}},
      _userId: req.user._id})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(req.body.mainTags){
    return Note.find({mainTags: {$elemMatch: {$in: req.body.mainTags}},
      _userId: req.user._id,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else if(req.body.otherTags){
    return Note.find({otherTags: {$elemMatch: {$in: req.body.otherTags}},
      _userId: req.user._id,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }else{
    return Note.find({$or: [{mainTags: {$elemMatch: {$in: req.body.tags}}}, {otherTags: {$elemMatch: {$in: req.body.tags}}}],
      _userId: req.user._id,})
      .sort({title:1, lastModificationDate: -1, creationDate: -1})
      .exec();
  }
}

function notesByTagWrapper(req, res, next, populate){
  ret = ParamHelp.notesByTagCheck(req, res, populate);
  if(!ret){
    return;
  }
  var query;
  if(populate){
    query = notesByTagPopulatedQueryBody(req);
  }else{
    query = notesByTagUnpopulatedQueryBody(req);
  }
  query
  .then(function(result){
    res.json({ok:true, result: result});
  })
  .catch(function(err){
    res.json({ok:false, msg: Utils.jsonErr(err)});
  });
}

function notesByTagPopulated(req, res, next){
  notesByTagWrapper(req, res, next, true);
}

module.exports.notesByTagPopulated = notesByTagPopulated;

function notesByTagUnpopulated(req, res, next){
  notesByTagWrapper(req, res, next, false);
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


function createNote(req, res, next){

  var ret = ParamHelp.createNoteCheck(req, res);
  if(!ret){
    return;
  }

        var tags = req.body.note.mainTags.concat(req.body.note.otherTags);
        var note = getNoteObject(req.body.note, req.user._id);
        note.save()
        .then(function(result){
          res.json({ok: true, result: result});
        })
        .catch(function(err){
          res.json({ok: false, msg: Utils.jsonErr(err)});
        });
}

module.exports.createNote = createNote;



function removeNote(req, res, next){
  var ret = ParamHelp.byIdCheck(req, res);
  if(!ret){
    return;
  }
  var id = ParamHelp.Getter.getId(req);
      Note.findOne({_userId: req.user._id, _id: id}).exec()
      .then(function(note){
        if(note){
          return note.remove();
        }else{
          // res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
          // return;
          throw new Error(Const.ERR_NOTE_NOT_FOUND);
        }
      })
      .then(function(result){
        res.json({ok: true});
      })
      .catch(function(err){
        res.json({ok: false, msg: Utils.jsonErr(err)});
      })
}

module.exports.removeNote = removeNote;



function removeAllNotes(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
    Note.remove({_userId: req.user._id}).exec()
    .then(function(result){
      return Tag.update({_userId: req.user._id},
        {notes:[]},
        {multi: true}).exec();
    })
    .then(function(secondResult){
      res.json({ok: true});
    })
    .catch(function(err){
      res.json({ok: false, msg: Utils.jsonErr(err)});
    });
}

module.exports.removeAllNotes = removeAllNotes;




  function updateText(req, res, next){
    var ret = ParamHelp.notesByTextCheck(req, res);
    if(!ret){
      return;
    }
        Note.findOneAndUpdate({_userId: req.user._id, _id: req.body.id},
          {text: req.body.text}).exec()
          .then(function(result){
            if(result){
              res.json({ok: true});
            }else{
              /*res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND})*/throw new Error(Const.ERR_NOTE_NOT_FOUND);;
            }
          })
          .catch(function(err){
            res.json({ok: false, msg: Utils.jsonErr(err)});
          });
}

module.exports.updateText = updateText;


//use an update, then call save...?
function addTagsBody(req,/* res, next, */data){
  if(req.body.mainTags && req.body.otherTags){
    for(var i=0;i<req.body.mainTags.length;i++){
      data.mainTags.addToSet(req.body.mainTags[i]);
    }
    for(var i=0;i<req.body.otherTags.length;i++){
      data.otherTags.addToSet(req.body.otherTags[i]);
    }
  }
  //add if not present
  //solutions: move to save also here.
  else if(req.body.mainTags){
    for(var i=0;i<req.body.mainTags.length;i++){
      data.mainTags.addToSet(req.body.mainTags[i]);
    }
  }
  else if(req.body.otherTags){
    for(var i=0;i<req.body.otherTags.length;i++){
      data.otherTags.addToSet(req.body.otherTags[i]);
    }
  }
  return data.save();
}

function removeTagsBody(req, /*res, next*/ data){
  // console.log("the main tags before: ", data.mainTags);
  if(req.body.mainTags && req.body.otherTags){
    for(var i=0;i<req.body.mainTags.length;i++){
      data.mainTags.pull(req.body.mainTags[i]);
    }
    for(var i=0;i<req.body.otherTags.length;i++){
      data.otherTags.pull(req.body.otherTags[i]);
    }
  }else if(req.body.mainTags){
    for(var i=0;i<req.body.mainTags.length;i++){
      data.mainTags.pull(req.body.mainTags[i]);
    }
  }else{
    for(var i=0;i<req.body.otherTags.length;i++){
      data.otherTags.pull(req.body.otherTags[i]);
    }
  }
  // console.log("the main tags after: ", data.mainTags);
  return data.save();

}

//so function will look better.

function removeAddTags(req, res, next, option){

  var ret = ParamHelp.removeAddTagsCheck(req, res, next, option);
  if(!ret){
    return;
  }

      var tags = ParamHelp.Getter.getTagsFromReq(req);
      var noteFind;
      Note.findOne({_userId: req.user._id, _id: req.body.id}).exec()
      .then(function(note){
        if(note){
          //check if tags exists.
          noteFind=note;
          return Tag.find({_userId: req.user._id, _id: {$in: tags}}).exec()
        }else{
          /*res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND})*/
          throw new Error(Const.ERR_NOTE_NOT_FOUND);
        }
      })
      .then(function(dataTags){
        if(dataTags.length==tags.length){
          if(option==Utils.Option.REMOVE){
            return removeTagsBody(req, noteFind);
          }else if(option==Utils.Option.ADD){
            return addTagsBody(req, noteFind);
          }
        }else{
          throw new Error(Const.ERR_TAG_NOT_FOUND);
        }
      })
      .then(function(savingResult){ //here if all is allright.
        res.json({ok: true});
      })
      .catch(function(err){
        res.json({ok: false, msg: Utils.jsonErr(err)});
      });
}


function addTags(req, res, next){
  removeAddTags(req, res, next, Utils.Option.ADD);
}

module.exports.addTags = addTags;


function removeTags(req, res, next){
  removeAddTags(req, res, next, Utils.Option.REMOVE);
}

module.exports.removeTags = removeTags;


function countNotes(req, res, next){
  var ret = ParamHelp.justUser(req, res);
  if(!ret){
    return;
  }
    Note.count({_userId: req.user._id})
    .then(function(data){
      res.json({ok: true, noteCount: data});
    })
    .catch(function(err){
      res.json({ok: false, msg: Utils.jsonErr(err)});
    });
}

module.exports.countNotes = countNotes;

function removeTagsBody(req, res, next){
  Note.findOneAndUpdate({_userId: req.user._id, _id: req.body.id},
    {$pullAll:{links: req.body.links}}).exec()
  .then(function(note){
    if(note){
      res.json({ok: true});
    }else{
      // res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .catch(function(err){
    res.json({ok: false, msg: Utils.jsonErr(err)});
  });
}

function addTagsBody(req, res, next){
  Note.findOneAndUpdate({_userId: req.user._id, _id: req.body.id},
    {$addToSet:{links: {$each: req.body.links}}}).exec()
  .then(function(note){
    if(note){
      res.json({ok: true});
    }else{
      // res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
      throw new Error(Const.ERR_NOTE_NOT_FOUND);
    }
  })
  .catch(function(err){
    res.json({ok: false, msg: Utils.jsonErr(err)});
  });
}


function removeAddRefsWrapper(req, res, next, option){
  var ret = ParamHelp.removeAddRefsCheck(req, res);
  if(!ret){
    return ret;
  }
  if(option==Utils.Option.ADD){
    addTagsBody(req, res, next);
  }else{
    removeTagsBody(req, res, next);
  }
}



  function addRefs(req, res, next){
    removeAddRefsWrapper(req, res, next, Utils.Option.ADD);
  }
module.exports.addRefs = addRefs;


//on array I prefer to update here then save.
//remember: save is already a promise.
//if not found nothing happens
  function removeRefs(req, res, next){
    removeAddRefsWrapper(req, res, next, Utils.Option.REMOVE);
  }

  module.exports.removeRefs = removeRefs;


  function setDone(req, res, next){
    var ret = ParamHelp.setDoneCheck(req, res);
    if(!ret){
      return;
    }
        Note.findOneAndUpdate({_userId: req.user._id, _id:req.body.id},
          {isDone: req.body.done}).exec()
        .then(function(note){
          if(note){
            res.json({ok:true})
          }else{
            /*res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND})*/
            throw new Error(Const.ERR_NOTE_NOT_FOUND);
          }
        })
        .catch(function(err){
          res.json({ok: false, msg: Utils.jsonErr(err)});
        });
  }

  module.exports.setDone = setDone;


  function cleanNotes(req, res, next){
    var ret = ParamHelp.justUser(req, res);
    if(!ret){
      return;
    }
      Note.find({_userId: req.user._id, isDone: false},
        function(err, data){
          if(err)return next(err);
            else if(data.length>0){
              for(var i=0;i<data.length;i++){
                data.remove(function(err, result){
                  if(err)return next(err);
                });
              }//....
            }
        });
  }
  module.exports.cleanNotes = cleanNotes;



  //for min
  function allNotesMin(req, res, next){
    var ret = ParamHelp.justUser(req, res);
    if(!ret){
      return;
    }
      Note.find({_userId: req.user._id},
                {_id: 1, title:1}).exec()
                .then(function(data){
                  res.json({ok: true, result: data});
                })
                .catch(function(err){
                  res.json({ok: false, msg: Utils.jsonErr(err)});
                });
  }
module.exports.allNotesMin = allNotesMin;
