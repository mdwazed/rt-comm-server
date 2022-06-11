const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []

app.get('/', (req, res) => {

  // Sending the response
  res.send('socket io local server')

  // Ending the response
  res.end()
})

io.on('connection', (socket) => {
  console.log(`Client connected with socket id: ${socket.id}`);
  const username = socket.handshake.query.username
  socket.on('msg', (data) => {
    console.log(data);
    socket.broadcast.emit('msg', data)
  });
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});