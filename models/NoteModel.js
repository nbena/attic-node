var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Tag = require("./TagModel.js")

// var hook = require('captain-hook');

var Utils = require('../public/javascripts/Utils');
mongoose.Promise=require('bluebird');


// defining Schema for a Note object
// var noteSchema = new Schema({
//   title: {type: String, required: true, unique: true},
//   text: String,
//   mainTags: [{tye: Schema.Types.ObjectId, ref: 'Tag'}],
//   otherTags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
//   //noteId: Schema.Type.ObjectId  not necessary
//   _userId: {type: String, ref: 'User'},
//   creationDate: {type: Date, default: Date.now},
//   lastModificationDate: {type: Date, default: Date.now},
// });

var noteSchema = new Schema({
  title:{type: String,
    required: true,
    lowercase: true,
    index: true}, //can't be uniqueg
  // _userId:{type: String, ref: 'User'},
  _userId: {type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  // mainTags:[{ type: String, ref: 'Tag' }],
  // otherTags:[ {type: String, ref: 'Tag'}],
  mainTags: [{type: Schema.Types.ObjectId,
              ref: 'Tag',
              set: function(mainTags){
                this._mainTags = this.mainTags;
                return mainTags;
              }}],
  otherTags: [{type: Schema.Types.ObjectId,
              ref: 'Tag',
              set: function(otherTags){
                this._otherTags = this.otherTags;
                return otherTags;
              }}],
  lastModificationDate: {type: Date, default: Date.now},
  creationDate: {type: Date, default: Date.now},
  isDone: {type: Boolean, default: false},
  links: [{type: String}]
});

//see
//https://coderwall.com/p/xe2m9a/expose-previous-values-in-mongoose
// noteSchema.path('mainTags').set(function(mainTags){
//   var originalMainTags = this.mainTags;
//   // this.mainTags = mainTags;
// });
//
// noteSchema.path('otherTags').set(function(otherTags){
//   var originalOtherTags = this.otherTags;
// });


noteSchema.index({title:1, _userId:1, mainTags: 1, otherTags:1}, {unique: true});

// noteSchema.plugin(hook);

//no call on the outside
function doUpdate(note){
  var now = Date.now();
  note.lastModificationDate=now;
  //note._id=require("../utils.js").sha256(note.getConsistentData());
}

//other function
noteSchema.method.addTagsToOtherTags = function(tags){
  for(var i=0;i<tags.length;i++){
    otherTags.push(tags[i]);
  }
}

noteSchema.method.getHumanCreationDate = function(){
  return new Date(this.creationDate).toDateString();
}

noteSchema.method.getHumanModificationDate = function(){
  return new Date(this.lastModificationDate).toDateString();
}

noteSchema.method.getHumanExtendedCreationDate = function(){
  return new Date(this.creationDate).toString();
}

noteSchema.method.getHumanExtendedModificationDate = function(){
  return new Date(this.lastModificationDate).toString();
}


// noteSchema.pre('save', function(next) {
//   doUpdate(this);
//   next();
// });

// //virtuals
// noteSchema.virtual("noteId").get(function(){
//   return this._id;
// })
//
// noteSchema.virtual("noteId").set(function(){
//   //set my custom id
//   this._id=require("../utils.js").sha256(note.getConsistentData);
// })
//
// noteSchema.virtual("consistentData").get(function(){
//   return this.title+this.mainTags.join()+this._userId;
// })

//{mainTags: {$elemMatch:{$in:[ "Tag1"]}}}
//yes!!!!
// Note.find({mainTags: {$elemMatch:{$in: [tagToSearach]}}}, function(err, data){
//       if(err){
//         console.log("Note error: ", err);
//         }else{
//           console.log("the note is: "+data);
//         }
//       });

noteSchema.post('init', function(){
  this._original = this.toObject();
});

noteSchema.pre('remove', function(next){
  Tag.update({notes: this._id, _userId: this._userId},
    {$pullAll: {notes: [this._id]},
    $inc: {notes_length: -1}},
    {multi: true},
    function(err, data){
      if(err){
        var error = new Error("impossible to remove tags", err);
        next(err);
      }
    });
    next();
});

function pushTagsOnNewNote(note){
  Tag.update({_userId: note._userId, $or: [
    {_id: {$in: note.mainTags}},
    {_id: {$in: note.otherTags}}]},
    {$push: {notes: note._id},
    $inc: {notes_length: 1}},
    {multi: true},
    function(err, data){
      if(err){
        var err = new Error("impossible to update tags", err);
        next(err);
        // throw err;
      }
    });
}

function updateTagsOnModifiedMainTags(note, next){
  if(note._original.mainTags.length>note.mainTags.length){
    var tagsToRemove = Utils.arrayDiff(note._original.mainTags, note.mainTags);
    //removing
    Tag.update({_userId: note._userId,
                _id: {$in: tagsToRemove}},
              {$pullAll: {notes: [note._id]},
              $inc: {notes_length: -1}},
              {multi: true},
              function(err, data){
                if(err){
                  var error = new Error("impossible to update mainTags", err);
                  next(error);
                }
              });
  }else if(note._original.mainTags.length<note.mainTags.length){//update
    Tag.update({_userId: note._userId,  $or: [
      {_id: {$in: note.otherTags}},
      {_id: {$in: note.mainTags}}
    ]},
      {$addToSet: {notes: note._id},
      $inc: {notes_length: 1}},
      {multi: true},
      function(err, data){
        if(err){
          var error = new Error("impossible to update mainTags", err);
          next(error);
        }
      });
  }
}

function updateTagsOnModifiedOtherTags(note, next){
  // if(note._otherTags.length>note.otherTags.length){ //remove
  if(note._original.otherTags.length>note.otherTags.length){ //remove
    var tagsToRemove = Utils.arrayDiff(note._original.otherTags, note.otherTags);
    Tag.update({_userId: note._userId,
                _id: {$in: tagsToRemove}},
              {$pullAll: {notes: [note._id]},
              $inc: {notes_length: -1}},
              {multi: true},
              function(err, data){
                if(err){
                  var error = new Error("impossible to update otherTags", err);
                  next(error);
                }
              });
  // }else if(note._otherTags.length<note.otherTags.length){//update
  }else if(note._original.otherTags.length<note.otherTags.length){//update
    Tag.update({_userId: note._userId, $or: [
      {_id: {$in: note.otherTags}},
      {_id: {$in: note.mainTags}}
    ]},
      {$addToSet: {notes: note._id},
      $inc: {notes_length:1}},
      {multi: true},
      function(err, data){
        if(err){
          var error = new Error("impossible to update otherTags", err);
          next(error);
          // throw err;
        }
      });
  }
}

//called just when a new note is created.
noteSchema.pre( 'save', function(next){
  var note = this;
    if(this.isNew){
      pushTagsOnNewNote(note, next);
    }else{
      if(note.isModified('mainTags')){
        updateTagsOnModifiedMainTags(note,next);
      }if(note.isModified('otherTags')){
        updateTagsOnModifiedOtherTags(note, next);
      }
    }
  this.lastModificationDate = Date.now();
  next();
});




var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
