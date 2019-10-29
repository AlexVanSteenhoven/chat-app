// Menu
function openMenu() {
  // Get the ID of the nav
  document.getElementById('menu').style.width = '250px';

  // Add text to the nav
  let span = document.createElement('span');
  span.setAttribute('id', 'con_user');
  span.innerText = 'Connected users:';

  // Append data on the nav
  document.querySelector('#menu').appendChild(span);
  document.getElementById('toggleSettings').style.display = 'inline-block';
}
function closeMenu() {
  // Get the ID of the nav
  document.getElementById('menu').style.width = '0px';

  // Remove the text from the nav
  let span = document.getElementById('con_user');
  span.parentNode.removeChild(span);
}