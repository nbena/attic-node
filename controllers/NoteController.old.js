var Note = require('../models/NoteModel');
// var UserController = ('./UserController');
// var passport = require('passport');
var AuthController = require('./AuthController.js');


/*
var result = AuthController.getUserFromToken(req.headers);
if(result.user){

}else{
  res.json(result);
}
*/

function allNotesPopulated(req, res, next){

// var result = AuthController.getUserFromToken(req.headers);
// console.log(result);
//  if(result.user){
//     Note.find({_userId: req.user._id})
//       .populate("mainTags")
//       .populate("otherTags")
//       .exec(function(err, all){
//         if(err) return next(err);
//           res.json({ok:true, result:all});
//       });
//  }
//  else{
//    res.json(result);
//  }
};

////module.exports.allNotesPopulated = allNotesPopulated;

//skeleton
/*
if(req.user._id){

}
else{
  res.json({ok: false, msg: "no token"});
}
*/



function allNotesUnpopulated(req, res, next){

// var result = AuthController.getUserFromToken(req.headers);
//  if(result.user){
//     Note.find({_userId: result.user._id})
//       // .populate("mainTags")
//       // .populate("otherTags")
//       .exec(function(err, all){
//         if(err) return next(err);
//           res.json({ok:true, result:all});
//       });
//  }
//  else{
//    res.json(result);
//  }
};

//module.exports.allNotesUnpopulated = allNotesUnpopulated;



function noteByTitleRegexPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   // Note.find({_userId: result.user._id, title:{$regex: req.body.title}})
  //   Note.find({_userId: req.user._id, title:{$regex: req.body.title}})
  //     .populate("mainTags")
  //     .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail: 1})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTitleRegexPopulated = noteByTitleRegexPopulated;


function noteByTitleRegexUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.find({_userId: result.user._id, title:{$regex: req.body.title}})
  //     // .populate("mainTags")
  //     // .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail: 1})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTitleRegexUnpopulated = noteByTitleRegexUnpopulated;


function noteByTitlePopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.findOne({_userId: result.user._id, title:req.body.title})
  //     .populate("mainTags")
  //     .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail: 1})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }

}

//module.exports.noteByTitlePopulated = noteByTitlePopulated;

function noteByTitleUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.findOne({_userId: result.user._id, title:req.body.title})
  //     // .populate("mainTags")
  //     // .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail: 1})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTitleUnpopulated = noteByTitleUnpopulated;


function noteByTitleRegexUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.find({_userId: result.user._id, title:req.body.title})
  //     // .populate("mainTags")
  //     // .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail: 1})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTitleRegexUnpopulated = noteByTitleRegexUnpopulated;





function noteByTextPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.find({_userId: result.user._id, text: {$regex: req.body.text}})
  //     .populate("mainTags")
  //     .populate("otherTags")
  //     .populate("_userId", {_id:1, e_mail:1})
  //     .exec(function(err, all){
  //       if(err)return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTextPopulated = noteByTextPopulated;


function noteByTextUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.find({_userId: result.user._id, text: {$regex: req.body.text}})
  //     // .populate("mainTags")
  //     // .populate("otherTags")
  //     // .populate("_userId", {_id:1, e_mail:1})
  //     .exec(function(err, all){
  //       if(err)return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByTextUnpopulated = noteByTextUnpopulated;


function noteByIdPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   var par;
  //   if(req.params.id || req.body.id){
  //     if(req.method=="GET"){
  //       par = req.params.id;
  //     }else{
  //       par =req.body.id;
  //     }
  //     Note.findOne({_userId: result.user._id, _id: par})
  //       .populate("mainTags")
  //       .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "id required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.noteByIdPopulated = noteByIdPopulated;



//{$or: [...]}
//Note.find({mainTags: {$elemMatch: {$in: [data._id]}}}, function(err, data){
function notesByTagPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({$or: [{mainTags: {$elemMatch: {$in: req.body.tags}}}, {otherTags: {$elemMatch: {$in: req.body}}}],
  //       _userId: result.user._id,})
  //       .populate("mainTags")
  //       .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err) return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.notesByTagPopulated = notesByTagPopulated;

function notesByMainTagPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({_userId: result.user._id, mainTags:{$elemMatch: {$in: req.body}}})
  //       .populate("mainTags")
  //       .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}


//module.exports.notesByMainTagPopulated = notesByMainTagPopulated;

function notesByOthersTagPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({_userId: result.user._id, otherTags:{$elemMatch: {$in: req.body}}})
  //       .populate("mainTags")
  //       .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.notesByOthersTagPopulated = notesByOthersTagPopulated;




function notesByTagUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({$or: [{mainTags: {$elemMatch: {$in: req.body.tags}}}, {otherTags: {$elemMatch: {$in: req.body}}}],
  //       _userId: result.user._id,})
  //       // .populate("mainTags")
  //       // .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err) return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.notesByTagUnpopulated = notesByTagUnpopulated;

function notesByMainTagUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({_userId: result.user._id, mainTags:{$elemMatch: {$in: req.body}}})
  //       // .populate("mainTags")
  //       // .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}


//module.exports.notesByMainTagUnpopulated = notesByMainTagUnpopulated;

function notesByOthersTagUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.tags){
  //     Note.find({_userId: result.user._id, otherTags:{$elemMatch: {$in: req.body}}})
  //       // .populate("mainTags")
  //       // .populate("otherTags")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }else{
  //     res.json({ok: false, msg: "tags required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.notesByOthersTagUnpopulated = notesByOthersTagUnpopulated;


function deleteAllNotes (req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Note.remove({_userId: result.user._id}, function(err, data){
  //     if(err)return next(err);
  //       res.json({ok: true, result: data});
  //   });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteAllNotes = deleteAllNotes;


function deleteNoteByTitleRegex(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.title){
  //     Note.remove({_userId: result.user._id, title: {$regex: req.body.title}},
  //     function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: true, result: data});
  //     });
  //   }else{
  //     res.json({ok: false, msg: "title required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteNoteByTitleRegex = deleteNoteByTitleRegex;

function deleteNoteByTitle(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.title){
  //     Note.remove({_userId: result.user._id, title: req.body.title},
  //     function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: true, result: data});
  //     });
  //   }else{
  //     res.json({ok: false, msg: "title required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteNoteByTitle = deleteNoteByTitle;


function deleteNoteById(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.params.id){
  //     Note.remove({_userId: result.user._id, _id: req.params.id},
  //       function(err, data){
  //         if(err)return next(err);
  //           res.json({ok: true, result: data});
  //     });
  //   }else{
  //     res.json({ok: false, msg: "id required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteNoteById = deleteNoteById;

function deleteNotesById(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.ids){
  //     Note.remove({_userId: result.user._id, _id: {$in: ids}},
  //       function(err, data){
  //         if(err)return next(err);
  //           res.json({ok: true, result: data});
  //     });
  //   }else{
  //     res.json({ok: false, msg: "ids required"});
  //   }
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteNotesById = deleteNotesById;

/*
function keepCreating(id, note, res, next){
  var noteMongo = new Note({
    title: note.title,
    text: note.text,
    _userId: id,
    _id: mongoose.Types.ObjectId()
  });

  for(var i=0;i<note.mainTags.length;i++){
    note.mainTags[i]._userId = id;
    note.mainTags[i].notes.push(noteMongo);
    Tag.findByOneAndUpdate({title: note.mainTags[i].title, _userId: id},
      {$push:{notes: noteMongo}},
      {upsert: true},
      function(err, data){
        if(err)return next(err);

        if(!data){ //if not exists
          var tag = new Tag({
            title: noteMainTags[i].title,
            _userId: id,
            notes : [noteMongo._id]
          });
          tag.save(function(err){
            if(err)return next(err);
          });
          data = tag;
        }
        note.mainTags[i]=data;
      }); //end of find one.
  }//for


  for(var i=0;i<note.otherTags.length;i++){
    note.otherTags[i]._userId = id;
    note.otherTags[i].notes.push(noteMongo);
    Tag.findByOneAndUpdate({title: note.otherTags[i].title, _userId: id},
      {$push:{notes: noteMongo}},
      {upsert: true},
      function(err, data){
        if(err)return next(err);

        if(!data){ //if not exists
          var tag = new Tag({
            title: noteMainTags[i].title,
            _userId: id,
            notes : [noteMongo._id]
          });
          tag.save(function(err){
            if(err)return next(err);
          });
          data = tag;
        }
        note.otherTags[i]=data; //link outside
      }); //end of find one.
  }//for

  noteMongo.mainTags = note.mainTags;
  noteMongo.otherTags = note.otherTags;

  noteMongo.save(function(err){
    if(err)return next(err);
  });

  res.json({ok: true, result: noteMongo});

}

function createNote2(req, res, next){
  if(req.user){
    if(req.body.note){
      var note = req.body.note;
      //before everything check if exists.
      Note.find({title: note.title, _userId: req.user._id},
        function(err, data){
          if(data.length==0){
            keepCreating(req.user._id, note, res, next); //keep compact, so all inside another
            //function
          }else{
            res.json({ok: false, msg: Const.ERR_NOTE_SAME_NAME});
          }
        });
    }else{
      res.json({ok: true, msg: Const.ERR_NOTE_REQUIRED});
    }
  }else{
    res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
  }
}
*/


// function setDone(req, res, next){
//   if(req.user){
//     console.log(req.body);
//     if(req.body.id && req.body.done){
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else if(data){
//               data.update({isDone: req.body.done}, function(err, result){
//                 if(err)return next(err);
//                   else{
//                     res.json({ok: true, result: result});
//                   }
//               })
//             }else{
//               res.json({ok: false,msg: Const.ERR_NOTE_NOT_FOUND});
//             }
//         });
//     }else{
//       res.json({ok: false, msg: Const.ERR_ID_DONE_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }

// function removeRefs(req, res, next){
//   if(req.user){
//     if(req.body.links && req.body.links instanceof Array && req.body.id){
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else if(data){
//               for(var i=0;i<req.body.links.length;i++){
//                 data.links.pull(req.body.links[i]);
//               }
//               data.save(function(err, result){
//                 if(err)return next(err);
//                   else{
//                     res.json({ok: true, result: result});
//                   }
//               });
//             }else{
//               res.json({ok: false,msg: Const.ERR_NOTE_NOT_FOUND});
//             }
//         });
//     }else{
//       res.json({ok:false, msg: Const.ERR_ID_REF_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }

// function addRefs(req, res, next){
//   if(req.user){
//     if(req.body.links && req.body.links instanceof Array && req.body.id){
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else if(data){
//               data.update({$addToSet: {links: {$each: req.body.links}}}, function(err, result){
//                 if(err)return next(err);
//                   else{
//                     res.json({ok: true, result: result});
//                   }
//               })
//             }else{
//               res.json({ok: false,msg: Const.ERR_NOTE_NOT_FOUND});
//             }
//         });
//     }else{
//       res.json({ok:false, msg: Const.ERR_ID_REF_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, result: data});
//   }
// }

// function removeTags(req, res, next){
//   if(req.user){
//     if(isTagsArrayOk(req) && req.body.id){
//       //check notes and tags exists.
//       var tags = getTagsFromReq(req);
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else{
//               if(data){ //found tags now.
//                 Tag.find({_userId: req.user._id, _id: {$in: tags}},
//                   function(err, dataTags){
//                     if(err)return next(err);
//                       else{
//                         if(dataTags.length == tags.length){
//                           removeTagsBody(req, res, next, data);
//                         }else{
//                           res.json({ok: false, msg: Const.ERR_TAGS_NOT_FOUND});
//                         }
//                       }
//                   });
//               }else{
//                 res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//               }
//             }
//         });
//     }else{
//       res.json({ok: false, msg: Const.ERR_TAGS_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }

// function addTags(req, res, next){
//   if(req.user){
//     if(Utils.isTagsArrayOk(req) && req.body.id){
//       var tags = Utils.getTagsFromReq(req);
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else{
//               if(data){
//                 Tag.find({_userId: req.user._id, _id: {$in: tags}},
//                 function(err, dataTags){
//                   if(err)return next(err);
//                     else{
//                       if(dataTags.length==tags.length){
//                         addTagsBody(req, res, next, data);
//                       }else{
//                         res.json({ok: false, msg: Const.ERR_TAGS_NOT_FOUND});
//                       }
//                     }
//                 });
//               }else{
//                 res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//               }
//             }
//         });
//     }else{
//       res.json({ok: false, msg: Const.ERR_TAGS_ID_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }


// function removeTags(req, res, next){
//   if(req.user){
//     if(Utils.isTagsArrayOk(req) && req.body.id){
//       var tags = Utils.getTagsFromReq(req);
//       //check if note exists.
//       var noteFind;
//       Note.findOne({_userId: req.user._id, _id: req.body.id}).exec()
//       .then(function(note){ //here after finding note
//         if(note){
//           //check if tags exists.
//           noteFind=note;
//           return Tag.find({_userId: req.user._id, _id: {$in: tags}}).exec()
//         }else{
//           res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//         }
//       })
//       .then(function(dataTags){ //here after finding tags
//         if(dataTags.length==tags.length){
//           return removeTagsBody(req, noteFind);
//         }else{
//           res.json({ok: false, msg: Const.ERR_TAGS_NOT_FOUND});
//         }
//       })
//       .then(function(savingResult){ //here if all is allright.
//         res.json({ok: true});
//       })
//       .catch(function(err){
//         res.json({ok: false, msg: Utils.jsonErr(err)});
//       });
//
//     }else{
//       res.json({ok: false, msg: Const.ERR_TAGS_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }

//
// function addTags(req, res, next){
//   if(req.user){
//     if(Utils.isTagsArrayOk(req) && req.body.id){
//       var tags = Utils.getTagsFromReq(req);
//       var noteFind;
//       Note.findOne({_userId: req.user._id, _id: req.body.id}).exec()
//       .then(function(note){
//         if(note){
//           noteFind=note;
//           return Tag.find({_userId: req.user._id, _id: {$in: tags}}).exec();
//         }else{
//           res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//         }
//         .then(function(dataTags){
//           if(dataTags.length==tags.length){
//             return addTagsBody(req, noteFind);
//           }else{
//             res.json({ok: false, msg: Const.ERR_TAGS_NOT_FOUND}),
//           }
//         });
//       })
//       .catch(function(err){
//         res.json({ok: false, msg: Utils.jsonErr(err)});
//       })
//
//     }else{
//       res.json({ok: false, msg: Const.ERR_TAGS_ID_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }


// function updateText(req, res, next){
//   if(req.user){
//     if(req.body.id && req.body.text){
//       Note.findOne({_userId: req.user._id, _id: req.body.id},
//         function(err, data){
//           if(err)return next(err);
//             else{
//               if(data){
//                 data.update({text: req.body.text},
//                   function(err, data){
//                     if(err)return next(err);
//                       else{
//                         res.json({ok: true, result: data});
//                       }
//                   });
//               }else{
//                 res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//               }
//             }
//         });
//     }else{
//       res.json({ok: false, msg: Const.ERR_TITLE_TEXT_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }
// function removeAllNotes(req, res, next){
//   if(req.user){
//     Note.remove({_userId: req.user._id}, function(err, data){
//       if(err)return next(err);
//         else{
//           //remove all notes from tags
//           Tag.update({_userId: req.user._id},
//             {notes: []},
//             {multi: true}, function(err, data){
//               if(err)return next(err);
//                 else{
//                   res.json({ok: true});
//                 }
//             });
//         }
//     })
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }
// function removeNoteByTitle(req, res, next){
//   if(req.user){
//     if(req.body.title){
//       Note.findOne({_userId: req.user._id, title: req.body.title},
//         function(err, data){
//           if(err)return next(err);
//             else{
//               if(data){
//                 data.remove(function(err){
//                   if(err)return next(err);
//                     else{
//                       res.json({ok: true});
//                     }
//                 });
//               }else{
//                 res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//               }
//             }
//         });
//     }else{
//       res.json({ok: false, msg: Const.ERR_TITLE_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED})
//   }
// }
// function removeNote(req, res, next){
//   if(req.user){
//     if(req.params.id){
//       Note.findOne({_id: req.params.id, _userId: req.user._id},
//          function(err, data){
//         if(err)return next(err);
//           else{
//             if(data){
//               data.remove(function(err){ //so middleware is fired. And it is fired!
//                 if(err)return next(err);
//                   else{
//                     res.json({ok: true});
//                   }
//               });
//             }else{
//               res.json({ok: false, msg: Const.ERR_NOTE_NOT_FOUND});
//             }
//           }
//       });
//     }else{
//       res.json({ok: false, msg: Const.ERR_ID_REQUIRED});
//     }
//   }else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }
