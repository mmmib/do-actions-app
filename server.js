var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var actions = require('./routes/actions');


var app = express();
var port = process.env.PORT || 3001;
app.set('port', port);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

app.use("/", [require("./middlewares/request"),require("./middlewares/response")]);

//Routes
app.use('/', index);
app.use('/actions', actions);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), function onListening() {
  console.log(`HTTP server start listening on port ${port}`);
  console.log('======================================================');
});

module.exports = app;
