// Menu
function openMenu() {
  document.getElementById('menu').style.width = '250px';

  let span = document.createElement('span');
  span.setAttribute('id', 'con_user');
  span.innerText = 'Connected users:';
  document.querySelector('#menu').appendChild(span);
  document.getElementById('toggleSettings').style.display = 'inline-block';
}
function closeMenu() {
  document.getElementById('menu').style.width = '0px';
  let span = document.getElementById('con_user');
  span.parentNode.removeChild(span);
  document.getElementById('toggleSettings').style.display = 'none';
}