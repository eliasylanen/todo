function showContent() {
  document.getElementsByClassName('progress')[0].style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('remember');

  fetch('/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (remember.checked) localStorage.setItem('todoToken', data.msg);
        else sessionStorage.setItem('todoToken', data.msg);
        showContent();
      } else alert(data.msg);
    })
    .catch(err => {
      console.log(err);
    });
}
