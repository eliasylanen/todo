function showContent() {
  document.getElementsByClassName('progress')[0].style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginUsername').value;

  showContent();

  fetch('/login', {
    method: 'POST',
    body: {
      username,
      password,
    },
  })
    .then(response => {

    });
}
