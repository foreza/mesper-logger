var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose");

// Connect to DB
const mongoConnectString = `mongodb://localhost:27017/mesper-logger-${process.env.NODE_ENV}`;
console.log(`Connecting to ${mongoConnectString}`);
mongoose.connect(mongoConnectString, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

// Event handlers
mongoose.connection.on('error', err => { console.log(`Mongoose env: ${process.env.NODE_ENV} connection error`)});
mongoose.connection.on('connected', () => { console.log(`Mongoose env: ${process.env.NODE_ENV} connected success`)});
mongoose.connection.on('disconnected', () => { console.log(`Mongoose env: ${process.env.NODE_ENV} disconnected`)});

var indexRouter = require('./routes/index');
var debugRouter = require('./routes/debug');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/debug', debugRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
