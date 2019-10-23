let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('newMessage', function (message) {
  console.log("newMessage", message)
});

socket.emit('createMessage', {
  from: 'Alex',
  text: 'Some text in here'
}, function () {
  console.log('Server received a message');
});