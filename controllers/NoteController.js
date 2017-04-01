var Note = require('../models/NoteModel');
var Tag = require('../models/TagModel');
var Const = require('../public/javascripts/Const.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Utils = require('../public/javascripts/Utils');
var ParamHelpRequest = require('../public/javascripts/ParamHelpRequest');

var NoteMiddle = require('../middle/NoteMiddle');

function allNotesPopulated(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.allNotesPopulated(req.user._id,function(result){
    res.json(result);
  });
  // NoteMiddle.allNotesPopulated(req.user._id, cb);
}

module.exports.allNotesPopulated = allNotesPopulated;

function allNotesUnpopulated(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.allNotesUnpopulated(req.user._id,function(result){
    res.json(result);
  });
}

module.exports.allNotesUnpopulated = allNotesUnpopulated;


function notesByTitleRegexPopulated(req, res, next){
  var ret = ParamHelpRequest.byTitleCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTitleRegexPopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  })
}

module.exports.notesByTitleRegexPopulated = notesByTitleRegexPopulated;


function notesByTitleRegexUnpopulated(req, res, next){
  var ret = ParamHelpRequest.byTitleCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTitleRegexPopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  })
}

module.exports.notesByTitleRegexUnpopulated = notesByTitleRegexUnpopulated;



function notesByTitlePopulated(req, res, next){
  var ret = ParamHelpRequest.byTitleCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTitlePopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  });
}
module.exports.notesByTitlePopulated=notesByTitlePopulated;

function notesByTitleUnpopulated(req, res, next){
  var ret = ParamHelpRequest.byTitleCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTitlePopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  });
}
module.exports.notesByTitleUnpopulated = notesByTitleUnpopulated;




function notesByTextPopulated(req, res, next){
  var ret = ParamHelpRequest.notesByTextCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTextPopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  });
}

module.exports.notesByTextPopulated = notesByTextPopulated;

function notesByTextUnpopulated(req, res, next){
  var ret = ParamHelpRequest.notesByTextCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.notesByTextPopulated(req.user._id, req.body.title,function(result){
    res.json(result);
  });
}

module.exports.notesByTextUnpopulated = notesByTextUnpopulated;


function noteByIdPopulated(req, res, next){
  var ret = ParamHelpRequest.byIdCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var id = ParamHelpRequest.Getter.getId(req);
  NoteMiddle.noteByIdPopulated(req.user._id, id,function(result){
    res.json(result);
  });
}

module.exports.noteByIdPopulated = noteByIdPopulated;




function notesByTagPopulated(req, res, next){
  var ret = ParamHelpRequest.notesByTagCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var mainTags = (req.body.mainTags) ? req.body.mainTags : null;
  var otherTags = (req.body.otherTags) ? req.body.otherTags : null;
  var tags = (req.body.tags) ? req.body.tags : null;
  NoteMiddle.notesByTagPopulated(req.user._id, mainTags, otherTags, tags,function(result){
    res.json(result);
  });
}

module.exports.notesByTagPopulated = notesByTagPopulated;

function notesByTagUnpopulated(req, res, next){
  var ret = ParamHelpRequest.notesByTagCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var mainTags = (req.body.mainTags) ? req.body.mainTags : null;
  var otherTags = (req.body.otherTags) ? req.body.otherTags : null;
  var tags = (req.body.tags) ? req.body.tags : null;
  NoteMiddle.notesByTagUnpopulated(req.user._id, mainTags, otherTags, tags,function(result){
    res.json(result);
  });
}

module.exports.notesByTagUnpopulated = notesByTagUnpopulated;






function createNote(req, res, next){

  var ret = ParamHelpRequest.createNoteCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.createNote(req.user._id, req.body.note,function(result){
    res.json(result);
  });
}

module.exports.createNote = createNote;



function removeNote(req, res, next){
  var ret = ParamHelpRequest.byIdCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var id = ParamHelpRequest.Getter.getId(req);
  NoteMiddle.removeNote(req.user._id, id,function(result){
    res.json(result);
  });
}

module.exports.removeNote = removeNote;



function removeAllNotes(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.removeAllNotes(req.user._id,function(result){
    res.json(result);
  });
}

module.exports.removeAllNotes = removeAllNotes;




  function updateText(req, res, next){
    var ret = ParamHelpRequest.notesUpdateTextCheck(req);
    if(!ret.ok){
      res.json(ret);
      return;
    }
    NoteMiddle.updateText(req.user.id, req.body.id, req.body.text,function(result){
      res.json(result);
    });
}

module.exports.updateText = updateText;

function updateTitle(req, res, next){
  var ret = ParamHelpRequest.notesUpdateTitleCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.updateTitle(req.user.id, req.body.id, req.body.title,function(result){
    res.json(result);
  });
}

module.exports.updateTitle = updateTitle;


function addTags(req, res, next){
  var ret = ParamHelpRequest.notesRemoveAddTagsCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var tags = ParamHelpRequest.Getter.getTagsFromReq(req);
  var mainTags = (req.body.mainTags) ? req.body.mainTags : null;
  var otherTags = (req.body.otherTags) ? req.body.otherTags : null;
  NoteMiddle.addTags(req.user._id, req.body.id, mainTags, otherTags, tags,function(result){
    res.json(result);
  });
}

module.exports.addTags = addTags;


function removeTags(req, res, next){
  var ret = ParamHelpRequest.notesRemoveAddTagsCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  var tags = ParamHelpRequest.Getter.getTagsFromReq(req);
  var mainTags = (req.body.mainTags) ? req.body.mainTags : null;
  var otherTags = (req.body.otherTags) ? req.body.otherTags : null;
  NoteMiddle.removeTags(req.user._id, req.body.id, mainTags, otherTags, tags,function(result){
    res.json(result);
  });
}

module.exports.removeTags = removeTags;


function countNotes(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.countNotes(req.user._id,function(result){
    res.json(result);
  });
}

module.exports.countNotes = countNotes;

function removeLinks(req, res, next){
  var ret = ParamHelpRequest.notesRemoveAddLinksCheck(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.removeLinks(req.user._id, req.body.id, req.body.links,function(result){
    res.json(result);
  });
}
module.exports.removeLinks = removeLinks;



function addLinks(req, res, next){
    var ret = ParamHelpRequest.notesRemoveAddLinksCheck(req);
    if(!ret.ok){
      res.json(ret);
      return;
    }
    NoteMiddle.addLinks(req.user._id, req.body.id, req.body.links,function(result){
      res.json(result);
    });
  }
module.exports.addLinks = addLinks;



  function setDone(req, res, next){
    var ret = ParamHelpRequest.notesDoneCheck(req);
    if(!ret.ok){
      res.json(ret);
      return;
    }
    NoteMiddle.setDone(req.user._id, req.body.done,function(result){
      res.json(result);
    });
  }

  module.exports.setDone = setDone;


  function cleanNotes(req, res, next){
    var ret = ParamHelpRequest.justUser(req);
    if(!ret.ok){
      res.json(ret);
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
    var ret = ParamHelpRequest.justUser(req);
    if(!ret.ok){
      res.json(ret);
      return;
    }
    NoteMiddle.allNotesMin(req.user._id,function(result){
      res.json(result);
    });
  }
module.exports.allNotesMin = allNotesMin;

function allNotesIds(req, res, next){
  var ret = ParamHelpRequest.justUser(req);
  if(!ret.ok){
    res.json(ret);
    return;
  }
  NoteMiddle.allNotesIds(req.user._id,function(result){
    res.json(result);
  });
}
module.exports.allNotesIds = allNotesIds;
