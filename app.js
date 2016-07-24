var express = require('express');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator')
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MONGO
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var mongoConfig = require('./app/config/mongoConfig.json');
const mongoUrl = mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.dbName;
mongoose.connect(mongoUrl);

db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function() {
  console.log('Mongo connected successfuly to: ' + mongoUrl );
});
// END MONGO

var routes = require('./routes/index');
var activities = require('./routes/activities');
var routines = require('./routes/routines');
var users = require('./routes/users');

var app = express();

// Swagger
var swagger = require('jsdoc-express-with-swagger');
var swaggerConfig = require('./app/config/swagger.json');
swagger.init(app, swaggerConfig);
// End Swagger

// Log Structure
var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
// End Log Structure

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined',{stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', routes);
app.use('/v1/activity', activities);
app.use('/v1/routine', routines);
app.use('/v1/users', users);

// Swagger Route
app.use(express.static(path.join(__dirname, 'swagger')));
app.get('/apiDocs', function (req, res) {
   res.sendFile(path.join(__dirname, './swagger', 'index.html'));
});
// End swagger route



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
