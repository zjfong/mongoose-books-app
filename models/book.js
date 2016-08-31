// book.js
//create schema!
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
     title: String,
     author: String,
     image: String,
     releaseDate: String
    // you should fill the rest of this in
});


//create book model
var Book = mongoose.model('Book', BookSchema);

//export Book!
module.exports = Book;
