var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM4', {baudRate: 9600});
const parser = new Readline();


//EXPRESS
server.listen(8081);

//app.use(express.static('dist'));


// ON ALLUME LA LED PARTIE SERIAL PORT
port.on('open' , () => {
  console.log("Salut les copaings");
  port.write('1');
});

port.on('close' , () => {
  console.log("A+ les copaings");
  port.write('0');
});



// LA PARTIE SOCKETIO
const NUMBER_PER_ROOM = 2;
let i = 0;
io.on('connection', socket => {
  i++;
  const myRoom = i % 2 ? 'even' : 'odd';

  socket.join(myRoom);
  const nbrPeople = io.sockets.adapter.rooms[myRoom].length;

  if (nbrPeople >= NUMBER_PER_ROOM){
    io.to(myRoom).emit('ready');
  }
  // io.to(myRoom).emit('people', nbrPeople);
  
  socket.on('disconnect', () => {
    if (io.sockets.adapter.rooms[myRoom].length < NUMBER_PER_ROOM && io.sockets.adapter.rooms[myRoom].length > 0){
      io.to(myRoom).emit('stop');
    }
  });


});



port.pipe(parser);

parser.on('data', data => {
    io.to('even').emit('data', data);
    io.to('odd').emit('data', 360 - data);
});

