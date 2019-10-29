let socket = io();

function autoscroll() {
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
}

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('HH:mm');
  const template = document.querySelector('#message').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#messages').appendChild(div);
  autoscroll();
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