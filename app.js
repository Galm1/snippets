const express = require('express');
const session = require('express-session');
const parseurl = require('parseurl');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const models = require('./models/models.js');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const url = 'mongodb://localhost:27017/snippets';
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
let database;

let profiles = [{
  username: 'username',
  password: 'password'
}, {
  username: 'sorry',
  password: 'notsorry'
}];

app.use(function(req, res, next) {
  if (req.url === '/login') {
    next();
  } else if (!req.session.login) {
    res.render('login');
  } else {
    next();
  }
})

app.get('/', function(req, res) {
  snippet.find().then(function(snip) {
      res.render('index', {data: snip})
  })})

app.post('/login', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log('username input = ' + username);
  console.log('password input = ' + password);
  for (let i = 0; i < profiles.length; i++) {
    if (username === profiles[i].username && password === profiles[i].password) {
      req.session.login = true;
    }
  }
  if (req.session.login === true) {
    res.render('index');
  } else {
    res.render('login', {
      error: "incorrect username or password"
    })
  }
})

///////////////////////////////////////


// let newTitle = 'first snipperino';
// const newSnippet = new snippets({title: newTitle, body: newCode});
// snippet.save()
//   .then(function () {
//     console.log('saved ' + name);
//     return newSnippet.findOne({title: newTitle})
//   }).then(function(results) {
//     console.log('\nfindOne returned\n' + results);
//     return newSnippet.find({body: 'some coderino'})
//   }).then(function (results) {
//     console.log('\n\nfind returned ' + results.length + ' results');
//   }).catch(function (error) {
//     console.log('error ' + JSON.stringify(error));
//   });




// app.post('/', function(req, res) {
//   const addsnip = req.body.title;
//   let newSnippet = new snippet({snippets: addSnippet});
//   newSnippet.save().then(function () {
//     console.log('added a new snippet');
//     return snippet.find({});
//   }).catch(function (error) {
//     console.log('error ' + JSON.stringify(error));
//   });
//   res.redirect('/');
// })











app.listen(3000, function() {
  console.log('SERVER IS LIVE');
})

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb");
  database = db;
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function() {
    console.log('DICONNECTED FROM MONGODB');
    process.exit(0);
  });
});
