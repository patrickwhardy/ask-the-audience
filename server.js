const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const io = socketIo(server);

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

const port = process.env.PORT || 3000;
const server = http.createServer(app)

server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});


module.exports = server;
