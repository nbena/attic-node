//#! /usr/bin/env node


//Get arguments passed on command line
// var userArgs = process.argv.slice(2);
// if (!userArgs[0].startsWith('mongodb://')) {
//     console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
//     return
// }

// var Book = require('./models/book')
// var Author = require('./models/author')
// var Genre = require('./models/genre')
// var BookInstance = require('./models/bookinstance')

var examples = require('./examples');
var User = require('../../models/UserModel');
var Note = require('../../models/NoteModel');
var Tag = require('../../models/TagModel');

var fixx = require('./Fixify');


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/attic");
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

 // examples.ciao();
 // examples.tryThings();

// examples.someUsers();

// examples.someNewFuck();

// examples.newNotes();

// examples.newNewNotes();

// examples.linkNotes();

// examples.newTags();

// examples.queryJustSomeField();

// examples.anotherNewNote();

// examples.createNotes();

// examples.newTags3();

//examples.linkTags();

// examples.linkTags2();

//examples.theNew();


//mongoose.connection.close();
//return;


// function authorCreate(first_name, family_name, d_birth, d_death, cb) {
//   authordetail = {first_name:first_name , family_name: family_name }
//   if (d_birth != false) authordetail.date_of_birth = d_birth
//   if (d_death != false) authordetail.date_of_death = d_death
//
//   var author = new Author(authordetail);
//
//   author.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Author: ' + author);
//     authors.push(author)
//     cb(null, author)
//   }  );
// }

fixx.fix();
