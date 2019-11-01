// Import Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const expressLayouts = require('express-ejs-layouts');

// Add in the database
const mongoose = require('mongoose');

// Config Database
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('[Database] is running on port 27017'))
    .catch(err => console.log(err));

// Import custom functions
const { genMessage } = require('./utils/message');

// Create the server
let app = express();
let server = http.createServer(app);
// Integrate socket.io with http and express
let io = socketIO(server).sockets;

// Set static path
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

// Set view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express middleware (use body-parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Routes
app.use('/', require('./routes/index'));
app.use('/u', require('./routes/users'));
app.use('/chat', require('./routes/chat'));

io.on('connection', socket => {
  console.log('A new user just connected');

  // Join message
  // For newly joined user
  socket.emit('newMessage', genMessage('Admin', 'Welcome to the chatroom!'));

  // For existing users
  socket.broadcast.emit('newMessage', genMessage('Admin', 'New user joined the chat'));

  // Create a new message
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', genMessage(message.from, message.text));
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
