var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Note = require("./NoteModel.js");
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  //name: String,
  // _id: String, //so notes must be userId as String
  e_mail: {type: String,
     unique: true,
     required: true},
     hashedPassword: {type: String,
    required: true}
  //notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]
});



//passport kindly taken from:
//http://scottksmith.com/blog/2014/05/29/beer-locker-building-a-restful-api-with-node-passport/
//for basic, for token-based:
//https://devdactic.com/restful-api-user-authentication-1/


userSchema.pre('save', function (next) {
    var user = this;
    //if new or modified, generate the new pass
    if (this.isModified('hashedPassword') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.hashedPassword, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.hashedPassword = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.checkPassword = function (password, cb) {
    bcrypt.compare(password, this.hashedPassword, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};




var User = mongoose.model('User',userSchema);
module.exports = User;
