// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

var db = require('./models')

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////

var books = [
  {
    _id: 15,
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    _id: 16,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    _id: 17,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) { return console.log("index error: " + err); }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var bookId = req.params.id;
  db.Book.findOne({_id: bookId}, function(err, books){
    if(err){
      return console.log("search error: " + err);
    }
    res.json(books)
  })
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new db.Book(req.body);
  //console.log(newBook);

   // db.Book.newBook;
  newBook.save(function(err){
    if(err){
      return console.log("create error: " + err);
    };
     res.json(newBook);
  });
});


// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  //console.log('books update', req.params);
  var bookId = req.params.id;

  db.Book.findOne({_id: bookId}, function(err, books){
    if(err){
      return console.log("update error: " + err);
    };
    books.title = req.params.title;
    books.author = req.params.author;
    books.image = req.params.image;
    books.release_date = req.params.release_date;
    res.send(books);
  })
});




// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var bookId = req.params.id;

  db.Book.findOneAndRemove({_id: bookId}, function(err, books){
    if(err){
      return console.log("delete error: " + err);
    };
    //console.log(books)
    res.send(books);
  })
});





app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
