var Const = require('./Const');

/*
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

*/
function arrayDiff(arg0, arg1){
  if(!(arg0 instanceof Array)  && !(arg1 instanceof Array)){
    throw new TypeError("the thwo args must be Array");
  }
  return arg0.filter(function(el){
      return arg1.indexOf(el)<0;
    })
  }

  module.exports.arrayDiff = arrayDiff;

  function jsonErr(err){
    return err.name+" "+err.message;
  }
  module.exports.jsonErr = jsonErr;

  // function isTagsArrayOk(req){
  //   if(req.body.mainTags  && req.body.otherTags){
  //     return (req.body.mainTags instanceof Array) &&
  //       (req.body.otherTags instanceof Array);
  //   }
  //   if(req.body.mainTtags){
  //     return req.body.mainTags instanceof Array;
  //   }
  //   if(req.body.otherTags){
  //     return req.body.otherTags instanceof Array;
  //   }
  // }
  // module.exports.isTagsArrayOk = isTagsArrayOk;

  const Option={ADD:0, REMOVE:1};
  module.exports.Option = Option;



function error404(req, res, next){
  res.status(404);
  res.json({ok: false, msg: Const.ERR_404});
}
module.exports.error404 = error404;


// var Check = {
//   byIdCheck : byIdCheck,
//   createNoteCheck: createNoteCheck,
//   isNoteOk: isNoteOk,
//   isRefOk: isRefOk,
//   notesByTagCheck: notesByTagCheck,
//   notesByTextCheck: notesByTextCheck,
//   byTitleCheck: byTitleCheck,
//   userPopulateCheck: userPopulateCheck,
//   removeAddTagsCheck: removeAddTagsCheck,
//   removeAddRefsCheck: removeAddRefsCheck,
//   setDoneCheck: setDoneCheck,
//   justUser: justUser
//
// }
// module.exports.Check=Check;
