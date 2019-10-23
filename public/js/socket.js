let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('newMessage', function (message) {
  console.log("newMessage", message);
  // Create a <li> tag and append it on the body
  let li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`;
  document.querySelector('body').appendChild(li);
});

// Prevent default button action (no-refresh)
const send_btn = document.querySelector('#submit-btn');
send_btn.addEventListener('click', function (e) {
  e.preventDefault();

  // Send the message entered in the input
  socket.emit('createMessage', {
    from: "User",
    text: document.querySelector('input[name="message"]').value
  })
});