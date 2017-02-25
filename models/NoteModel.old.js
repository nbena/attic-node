function pushTagsOnNewNote(note, next){
  Tag.update({_userId: note._userId, $or: [
    {_id: {$in: note.mainTags}},
    {_id: {$in: note.otherTags}}]},
    {$push: {notes: note._id}},
    {multi: true},
    function(err, data){
      if(err){
        var err = new Error("impossible to update tags", err);
        next(err);
      }
    });
}

function updateTagsOnModifiedMainTags(note, next){
  console.log("mainTags is modified");
  console.log("maintags.length: ", note.mainTags.length, " _maintags.length: ", note._mainTags.length);
  if(note._mainTags.length>note.mainTags.length){ //remove
    consle.log("first opt");
    Tag.update({_userId: note.userId, notes: {$in: [note._id]}},
      {$pullAll: {notes: [note._id]}},
      {multi: true},
      function(err, data){
        if(err){
          console.log("err inpullAll", err);
          var error = new Error("impossible to update mainTags", err);
          next(error);
        }
      });
  }else if(note._mainTags.length<note.mainTags.length){//update
    console.log("second opt");
    Tag.update({_userId: note._userId,  $or: [
      {_id: {$in: note.otherTags}},
      {_id: {$in: note.mainTags}}
    ]},
      {$push: {notes: note._id}},
      {multi: true},
      function(err, data){
        console.log("I've done what I have to do");
        if(err){
          console.log("err in push", err);
          var error = new Error("impossible to update mainTags", err);
          next(error);
        }
      });
  }
}

function updateTagsOnModifiedOtherTags(note, next){
  if(note._otherTags.length>note.otherTags.length){ //remove
    Tag.update({_userId: note.userId, notes: {$in: [note._id]}},
      {$pullAll: {notes: [note._id]}},
      {multi: true},
      function(err, data){
        if(err){
          var error = new Error("impossible to update otherTags", err);
          next(error);
        }
      });
  }else if(note._otherTags.length<note.otherTags.length){//update
    Tag.update({_userId: note._userId, $or: [
      {_id: {$in: note.otherTags}},
      {_id: {$in: note.mainTags}}
    ]},
      {$push: {notes: note._id}},
      {multi: true},
      function(err, data){
        if(err){
          var error = new Error("impossible to update otherTags", err);
          next(error);
        }
      });
  }
}


//called just when a new note is created.
noteSchema.pre( 'save', function(next){
  var note = this;
  console.log("the fucking event is fired");
  console.log("note.isModified('mainTags')? ", note.isModified('mainTags'));
  if(note.isNew){ //push tags
    pushTagsOnNewNote(note, next);
  }
  else{
    if(note.isModified('mainTags')){
      updateTagsOnModifiedMainTags(note,next);
    }if(note.isModified('otherTags')){
      updateTagsOnModifiedOtherTags(note, next);
    }
  }
  next();
});
