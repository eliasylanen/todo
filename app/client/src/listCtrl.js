angular
  .module('todoApp')
  .controller('listCtrl', listCtrl);

listCtrl.$inject = ['appFactory'];
function listCtrl(appFactory) {
  const vm = this;

  vm.token = appFactory.token;
  vm.listItems = null;
  vm.itemToEdit = null;
  vm.sortByThis = 'item.done';
  vm.reverse = false;

  vm.init = init;
  vm.addItem = addItem;
  vm.editItem = editItem;
  vm.deleteItem = deleteItem;
  vm.save = save;
  vm.cancel = cancel;
  vm.logout = logout;
  vm.sort = sort;

  function init() {
    if (!vm.token) window.location.replace('/');
    appFactory.getList()
      .then(data => {
        vm.listItems = data.data.msg[0].item;
      })
      .catch(err => { alert(err); });
    $('.button-collapse').sideNav();
  }

  function addItem() {
    $('#addEdit').slideToggle('slow');
    vm.itemToEdit = {
      done: false,
      content: null,
      priority: null,
    };
  }

  function editItem(id) {
    vm.itemToEdit = vm.listItems.find((value) => value._id === id);
    $('#addEdit').slideToggle('slow');
  }

  function deleteItem(id) {
    appFactory.deleteItem(id)
    .then(() => appFactory.getList())
    .then((data) => {
      vm.listItems = data.data.msg[0].item;
    })
    .catch(err => { alert(err); });
  }

  function save() {
    if (vm.itemToEdit.content && vm.itemToEdit.priority
        && (vm.itemToEdit.priority <= 3 && vm.itemToEdit.priority >= 1)) {
      appFactory.addItem(vm.itemToEdit)
      .then(() => appFactory.getList())
      .then((data) => {
        vm.listItems = data.data.msg[0].item;
      })
      .catch(err => { alert(err); });
      $('#addEdit').slideToggle('slow');
    } else {
      alert('Please input correct values to both content and priority');
    }
  }

  function cancel() {
    $('#addEdit').slideToggle('slow');
  }

  function logout() {
    localStorage.removeItem('todoToken');
    sessionStorage.removeItem('todoToken');
    window.location.replace('/');
  }

  function sort(sortByThis) {
    vm.reverse = (vm.sortByThis === sortByThis) ? !vm.reverse : false;
    vm.sortByThis = sortByThis;
  }
}
