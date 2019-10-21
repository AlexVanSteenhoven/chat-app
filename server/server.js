// Import Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Create the server
let app = express();
let server = http.createServer(app);
// Integrate socket.io with http and express
let io = socketIO(server).sockets;

// Set static path
const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('A new user just connected');

  // Join message
  // For newly joined user
  socket.emit('newMessage', {
    from: '[Broadcaster]',
    text: 'Welcome to the chatroom!',
    createdAt: new Date().getTime()
  });

  // For existing users
  socket.broadcast.emit('newMessage', {
    from: '[Broadcaster]',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // Create a new message
  socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('A user just disconnected');
  });
});

// Define port and start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`[Server] running on http://localhost:${port}`);
});
