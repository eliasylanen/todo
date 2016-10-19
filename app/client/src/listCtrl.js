angular
  .module('todoApp')
  .controller('listCtrl', listCtrl);

listCtrl.$inject = ['appFactory'];
function listCtrl(appFactory) {
  const vm = this;

  vm.token = appFactory.token;
  vm.listItems = null;

  vm.init = init;

  function init() {
    if (!vm.token) window.location.replace('/');
    appFactory.getList()
      .then(data => {
        vm.listItems = data.data.msg[0].item;
      })
      .catch(err => { alert(err); });
  }
}
