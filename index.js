const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var connectionOptions = {
  // "force new connection": true,
  // "reconnectionAttempts": "Infinity",
  // "timeout": 10000,
  "transports": ["websocket"]
};
const { Server } = require("socket.io", connectionOptions);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//1
app.use(cors())
//2
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
io.on('connection', (socket) => {
  console.log('a user connected');
  //when the user send massage
  socket.on('sendMessage', (message) => {
    // console.log("hello");
    console.log(message);
    io.emit('massage', "jghjhjeh")
  })
  // socket.on('disconnect', () => {
  //   io.to(4).emit('message', { user: '' })
  //   io.to(4).emit('roomDate', { room: '' })

  // })
});

server.listen(3020, () => {
  console.log('listening on *:3000');
});