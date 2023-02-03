var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socket = require('socket.io')
const helmet = require('helmet')

var app = express();
app.use(helmet())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('server started')
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log('socket connection made with id '+ socket.id)

  socket.on('chat', (data) => {
      console.log(data)
      io.sockets.emit('chat',data)
  })

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  })
})