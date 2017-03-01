//loading my models
var User = require('../../models/UserModel');
var Tag = require('../../models/TagModel');
var Note = require('../../models/NoteModel');



//add to array: Show.update({ "_id": showId },{ "$push": { "episodes": episodeData } },callback)

  function searchNoteByTag(tagToSearach){
    var note = new Note({});
    //{mainTags: {$elemMatch:{$in:[ "Tag1"]}}}
    //yes!!!!
    // Note.find({mainTags: {$elemMatch:{$in: [tagToSearach]}}}, function(err, data){
    //       if(err){
    //         console.log("Note error: ", err);
    //         }else{
    //           console.log("the note is: "+data);
    //         }
    //       });

    Tag.find({title:tagToSearach}, function(err, data){
      if(err){
        console.log(err);
      }else{
        if(data.length<=0){
          console.log("error, no tag found");
        }else{
          //ok
          Note.find({mainTags: {$elemMatch: {$in: [data._id]}}}, function(err, data){
            if(err){
              console.log(err);
            }else{
              console.log(data);
            }
          });
        }
      }
    });
  }





/*
clientSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Sweepstakes.remove({client_id: this._id}).exec();
    Submission.remove({client_id: this._id}).exec();
    next();
});
//for on update-delete cascade
*/









//for text-searching
//db.notes.find({text: {$regex: "Ellon"}})
//or
//> db.notes.find({$text: {$search: "Ellon"}})
//it requires an index on the field:
//db.tags.ensureIndex({field: "text"}) //text is the type


  //use find with just some field is called "projection"
  //_id always returned
  //use 1 to say: just this
  //use 0 to say: this no
  function queryJustSomeField(){
    Note.find({}, {title:1}, function(err, data){
      if(err){
        console.log(err);
      }else{
        console.log("Just the title:\n");
        console.log(data);
      }
    });
    Note.find({}, {_id:0}, function(err, data){
      if (err){
        console.log(err);
      }else{
        console.log("Everything but not the id:\n");
        console.log(data);
      }
    });
  }



function theNew(){
  var user1 = new User({
    e_mail: "nicola@bena.it",
    hashedPassword: "nicolaPassword"
  });
  var user2 = new User({
    e_mail : "mikkel@bjergso.dk",
    hashedPassword: "mikkellerPassword"
  })
  var user3 = new User({
    e_mail: "menno@oliver.nl",
    hashedPassword: "mennoPassword"
  });

  var tag1 = new Tag({
    title: "tag1",
    _userId: user1._id
  });
  var tag2 = new Tag({
    title: "tag2",
    _userId: user1._id
  });
  var tag3 = new Tag({
    title: "tag3",
    _userId: user2._id
  });
  var tag4 = new Tag({
    title: "tag4",
    _userId: user2._id
  });
  var tag5 = new Tag({
    title: "tag5",
    _userId: user3._id
  });
  var tag6 = new Tag({
    title: "tag6",
    _userId: user3._id
  });


  var otag1 = new Tag({
    title: "otag1",
    _userId: user1._id
  });
  var otag2 = new Tag({
    title: "otag2",
    _userId: user1._id
  });
  var otag3 = new Tag({
    title: "otag3",
    _userId: user2._id
  });
  var otag4 = new Tag({
    title: "otag4",
    _userId: user2._id
  });
  var otag5 = new Tag({
    title: "otag5",
    _userId: user3._id
  });
  var otag6 = new Tag({
    title: "otag6",
    _userId: user3._id
  });

  var note1 = new Note({
    title: "note1 title",
    text: "note1 text",
    _userId: user1._id,
    mainTags: [tag1._id, tag2._id],
    otherTags: [otag1._id, otag2._id]
  });

  var note2 = new Note({
    title: "note2 title",
    text: "note2 text",
    _userId: user2._id,
    mainTags: [tag3._id, tag4._id],
    otherTags: [otag3._id, otag4._id]
  });

  var note3 = new Note({
    title: "note3 title",
    text: "note3 text",
    _userId: user3._id,
    mainTags: [tag5._id, tag6._id],
    otherTags: [tag5._id, otag6._id]
  });

  tag1.notes.push(note1);
  otag1.notes.push(note1);
  tag2.notes.push(note1);
  otag2.notes.push(note1);

  tag3.notes.push(note2);
  otag3.notes.push(note2);
  tag4.notes.push(note2);
  otag4.notes.push(note2);

  tag5.notes.push(note3);
  otag5.notes.push(note3);
  tag6.notes.push(note3);
  otag6.notes.push(note3);

  var users = [user1, user2, user3];
  var tags = [tag1, tag2, tag3, tag4, tag5, tag6, otag1, otag2, otag3, otag4, otag5, otag6];
  var notes = [note1, note2, note3];


  for(var i=0;i<users.length;i++){
    users[i].save(function(err){
      if(err){
        console.log(err);
        return;
      }
    });
  }


  for (var i=0;i<tags.length;i++){
    tags[i].save(function(err){
      if(err){
        console.log(err);
        return;
      }
    });
  }

  for(var i=0;i<notes.length;i++){
    notes[i].save(function(err){
      if(err){
        console.log(err);
        return;
      }
    });
  }

  /*
  martin@dickie.co.uk
  dickiePassword

  james@watt.co.uk
   wattPassword

   omni@pollo.com
   omniPassword

  */

}



  // // module.exports.someUsers = someUsers;
  // module.exports.searchNoteByTag = searchNoteByTag;
  // // module.exports.newNotes = newNotes;
  // // module.exports.newNewNotes = newNewNotes;
  // // module.exports.linkNotes = linkNotes;
  // module.exports.newTags = newTags;
  // module.exports.queryJustSomeField = queryJustSomeField;
  // module.exports.createNotes = createNotes;
  // module.exports.newTags2 = newTags2;
  // module.exports.newTags3 = newTags3;
  // module.exports.linkTags = linkTags;
  // module.exports.linkTags2 = linkTags2;
  // module.exports.theNew = theNew;
