var Tag = require('../models/TagModel');
var AuthController = require('./AuthController.js');

/*
var result = AuthController.getUserFromToken(req.headers);
if(result.user){

}else{
  res.json(result);
}
*/
//
// function allTagsPopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Tag.find({_userId: result.user._id})
  //     .populate("notes")
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //       res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.allTagsPopulated = allTagsPopulated;


// function allTagsUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Tag.find({_userId: result.user._id})
  //     .exec(function(err, all){
  //       if(err) return next(err);
  //       res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.allTagsUnpopulated = allTagsUnpopulated;
//why not switch between population by a flag into the the req? Easy, because
//so I can do a GET with no para (simpler).


//
// function tagByTitlePopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   var titleToSearch;
  //   if(req.method == "GET"){
  //     titleToSearch=req.params.title;
  //   }else /* if(req.method == "POST")*//*other methods not defined*/{
  //     titleToSearch=req.body.title;
  //   }
  //   Tag.find({_userId: result.user._id, title: {$regex: titleToSearch}})
  //     .populate("notes")
  //     .exec(function(err, all){
  //       if(err)return next(err);
  //         res.json({ok:true, result:all});
  //     });
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.tagByTitlePopulated = tagByTitlePopulated;


// function tagByTitleUnpopulated(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if(req.body.title){
  //     var titleToSearch = req.body.title;
  //     Tag.find({_userId: result.user._id, title: {$regex: titleToSearch}})
  //       .populate("notes")
  //       .exec(function(err, all){
  //         if(err)return next(err);
  //           res.json({ok:true, result:all});
  //       });
  //   }
  //   else{
  //     res.json({ok: false, msg: "title required"});
  //   }
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.tagByTitleUnpopulated = tagByTitleUnpopulated;


// function tagById(req, res, next){

  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   var id;
  //   if(req.body.id || req.params.id){
  //     if(req.method == "GET"){
  //       id = req.params.id;
  //     }else{ //POST
  //       id = req.body.id;
  //     }
  //     Tag.findById(id, function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: true, result: data});
  //     })
  //   }else{
  //     res.json({ok: false, msg: "id required"});
  //   }
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.tagById = tagById;



//put
//api/notes/:title PUT
//api/notes/create PUT body:{"title":"new-title"}
// function createTag(req, res, next){

  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   var titleToSearch;
  //   if(req.body.title || req.params.title){
  //     //search if this tag is present for the current user
  //     if(req.body.title){
  //       titleToSearch = req.body.title;
  //     }else{
  //       titleToSearch = req.params.title;
  //     }
  //     Tag.find({title: titleToSearch, _userId: result.user._id},
  //        function(err, data){
  //       if(err)return next(err);
  //       else{
  //         if (data.length==0){
  //           Tag.create({title: titleToSearch, _userId: result.user._id},
  //             function(err, done){
  //             if(err)return next(err);
  //               res.json({ok: true, result:done});
  //           });
  //         }else{
  //           res.json({ok: false, msg:"another tag with the same"+
  //            "name is already saved."})
  //         }
  //       }
  //     });
  //   }else{
  //     res.json({ok: false, msg: "title required"});
  //   }
  // }else{
  //   res.json(result);
  // }
// }

//module.exports.createTag = createTag;


//delete
// function deleteTagById(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if (req.body.id || req.params.id){
  //     var id;
  //     if(req.body.id){
  //       id = req.body.id;
  //     }
  //     else if(req.params.id){
  //       id = req.params.id;
  //     }
  //     Tag.remove({_id: id, _userId: result.user._id}, function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: "true", result: data});
  //     });
  //   }//here if no id is provided
  //   else{
  //     res.json({ok: false, msg: "require id"});
  //   }
  // }else{ //here if no user is found
  //   res.json(result);
  // }
// }

//module.exports.deleteTagById = deleteTagById;

// function deleteOneTagByTitle(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if (req.body.title || req.params.title){
  //     var title;
  //     if(req.body.title){
  //       title = req.body.title;
  //     }
  //     else if(req.params.title){
  //       title = req.params.title;
  //     }
  //     Tag.remove({title: title, _userId: result.user._id}, function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: "true", result: data});
  //     });
  //   }//here if no id is provided
  //   else{
  //     res.json({ok: false, msg: "require id"});
  //   }
  // }else{ //here if no user is found
  //   res.json(result);
  // }

// }

//module.exports.deleteOneTagByTitle = deleteOneTagByTitle;


// function deleteTagsByTitleRegex(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if (req.body.title){
  //     var title = req.body.title;
  //     Tag.remove({title: {$regex: title}, _userId: result.user._id}, function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: "true", result: data});
  //     });
  //   }//here if no id is provided
  //   else{
  //     res.json({ok: false, msg: "require id"});
  //   }
  // }else{ //here if no user is found
  //   res.json(result);
  // }
// }

//module.exports.deleteTagsByTitleRegex = deleteTagsByTitleRegex;

//delete is default set to multi
// function deleteTagsById(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   if (req.body.ids){
  //     var ids = req.body.ids;
  //     Tag.remove({_id: {$in: ids}, _userId: result.user._id}, function(err, data){
  //       if(err)return next(err);
  //         res.json({ok: true, result: data});
  //     });
  //     }
  //     else{
  //       res.json({ok: false, msg: "require id"});
  //     }
  // }else{ //here if no user is found
  //   res.json(result);
  // }
// }

//module.exports.deleteTagsById = deleteTagsById;

//add control for note with no tags
//or at least throw a warn (it always happens)
// function deleteAllTags(req, res, next){
  // var result = AuthController.getUserFromToken(req.headers);
  // if(result.user){
  //   Tag.remove({}, function(err, data){
  //     if(err)return next(err);
  //       res.json({ok: true, result: data});
  //   });
  // }else{
  //   res.json(result);
  // }
}

//module.exports.deleteAllTags = deleteAllTags;



// function deleteTagsByTitleRegex(req, res, next){
//   if(req.user){
//     if (req.body.title){
//       var title = req.body.title;
//       Tag.remove({title: {$regex: title}, _userId: req.user._id}, function(err, data){
//         if(err)return next(err);
//           res.json({ok: true, result: data});
//       });
//     }//here if no id is provided
//     else{
//       res.json({ok: false, msg: Const.ERR_TITLE_REQUIRED});
//     }
//   }
//   else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }
//
// module.exports.deleteTagsByTitleRegex = deleteTagsByTitleRegex;
//
// //delete is default set to multi
// function deleteTagsById(req, res, next){
//   if(req.user){
//     if (req.body.ids){
//       var ids = req.body.ids;
//       Tag.remove({_id: {$in: ids}, _userId: req.user._id}, function(err, data){
//         if(err)return next(err);
//           res.json({ok: true, result: data});
//       });
//       }
//       else{
//         res.json({ok: false, msg: Const.ERR_IDS_REQUIRED});
//       }
//   }
//   else{
//     res.json({ok: false, msg: Const.ERR_TOKEN_REQUIRED});
//   }
// }
//
// module.exports.deleteTagsById = deleteTagsById;
