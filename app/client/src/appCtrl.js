angular
  .module('todoApp')
  .controller('appCtrl', appCtrl);

appCtrl.$inject = ['appFactory'];
function appCtrl(appFactory) {
  const vm = this;
  let token = null;

  const splash = document.getElementById('splash');
  const preloader = document.getElementsByClassName('preloader-wrapper')[0];

  vm.login = login;
  vm.listItems = null;

  activate();

  function activate() {
    token = localStorage.getItem('todoToken') || sessionStorage.getItem('todoToken') || false;

    if (token) {
      splash.style.display = 'none';
      preloader.style.display = 'block';
      showContent();
    }
  }

  function showContent() {
    document.getElementsByClassName('progress')[0].style.display = 'block';
    appFactory.getList(token)
      .then(result => { console.log(result.data.msg[0].item); });
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
}
