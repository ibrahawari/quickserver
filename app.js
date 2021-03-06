var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// database connection
mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

// instantiate the route classes and add them to this const
const routes = {
  posts: (() => {
    let postsRoute = require('./routes/postsRoute');
    return new postsRoute();
  })(),
  scripts: (() => {
    let scriptsRoute = require('./routes/scriptsRoute');
    return new scriptsRoute();
  })(),
  webData: (() => {
    let webDataRoute = require('./routes/webDataRoute');
    return new webDataRoute();
  })()
}

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// define routes
app.use('/posts', routes.posts.router);
app.use('/scripts', routes.scripts.router);
app.use('/webData', routes.webData.router);

module.exports = app;