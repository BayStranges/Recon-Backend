const socketio = require('socket.io');
const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
