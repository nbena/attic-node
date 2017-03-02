var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Note = require("./NoteModel.js");
mongoose.Promise=require('bluebird');

var tagSchema = new Schema({
  // _id: {type: String, uppercase: false, trim: true},
  title: {type: String,
    lowercase: true,
    trim: true,
    required: true,
    index:true}, //no unique, two user can have the same
  notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
  notes_length: Number,
  _userId: {type: Schema. Types.ObjectId, ref: 'User'}
});

// tagSchema.virtual("title").get(function(){
//   return this._id;
// })
//
// tagSchema.virtual("title").set(function(title){
//   this._id=title;
// })

tagSchema.index({title:1, _userId:1}, {unique: true});

var Tag = mongoose.model('Tag',tagSchema);
module.exports = Tag;

/*
// Remove User
module.exports.removeUser = function(id, callback){

    User.findById(id, function (err, doc) {
        if (err) {

        }

        doc.remove(callback);
    })
}

//Remove vouchers related to users
userSchema.pre('remove', function(next) {
    this.model('Voucher').remove({ user: this._id }, next);
});
*/

tagSchema.pre('remove', function(next){
  Note.update({_userId: this._userId,
    $or: [
      {mainTags: {$elemMatch: {$in: [this._id]}}},
      {otherTags: {$elemMatch: {$in: [this._id]}}}
    ]
  },
    {$pullAll:{mainTags: [this._id]},
    $pullAll: {otherTags: [this._id]}},
    {multi: true}, function(err, data){
      if(err){
        var error = new Error("fail to remove tag from notes", err);
        next(err);
      }
    });
    next();
});
