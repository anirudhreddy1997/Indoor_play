var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('./db/mongoose');
const logger = require('morgan');

const auth = require('./middleware/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRegistration');
const authRouter = require('./routes/auth');
const logoutRouter = require('./routes/logout');
const gamesRouter = require('./routes/games');
const createGameRouter = require('./routes/createGame');
const deleteGameRouter = require('./routes/deleteGame');
const wishlistRouter = require('./routes/wishlist');
const wishlistItemsRouter = require('./routes/wishlistItems');
const deleteWishlistRouter = require('./routes/deleteWishlist');
const editGameRouter = require('./routes/editGame');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usersRegistration', usersRouter);
app.use('/auth',authRouter);
app.use('/logout', logoutRouter);
app.use('/games', auth, gamesRouter);
app.use('/createGame', createGameRouter);
app.use('/deleteGame', deleteGameRouter);
app.use('/wishlist', wishlistRouter);
app.use('/wishlistItems', wishlistItemsRouter);
app.use('/deleteWishlist', deleteWishlistRouter);
app.use('/editGame', editGameRouter);

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


