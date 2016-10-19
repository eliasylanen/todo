angular
  .module('todoApp')
  .controller('accessCtrl', accessCtrl);

accessCtrl.$inject = ['appFactory', '$location'];
function accessCtrl(appFactory, $location) {
  const vm = this;

  vm.token = appFactory.token;

  vm.loginUsername = null;
  vm.loginPassword = null;
  vm.remember = false;

  vm.registerUsername = null;
  vm.registerPassword = null;

  vm.clicked = false;

  vm.access = access;

  (() => {
    if (vm.token) $location.path('/lists').replace();
  })();

  function access(method) {
    let username;
    let password;

    if (method === 'login') {
      username = vm.loginUsername;
      password = vm.loginPassword;
    } else {
      username = vm.registerUsername;
      password = vm.registerPassword;
    }

    if (!username || !password) alert('Please fill all fields');
    else {
      vm.clicked = true;

      appFactory.loginOrRegister(method, username, password)
        .then(data => {
          if (data.data.success) {
            if (method === 'login') {
              vm.remember
              ? localStorage.setItem('todoToken', data.data.msg)
              : sessionStorage.setItem('todoToken', data.data.msg);
              appFactory.token = data.data.msg;
              $location.path('/lists').replace();
            } else {
              alert('Thank you for registering, you may log in now');
              location.reload();
            }
          } else {
            alert(data.data.msg);
            vm.clicked = false;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
}
