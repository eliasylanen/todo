angular
  .module('todoApp')
  .factory('appFactory', appFactory);

appFactory.$inject = ['$http'];
function appFactory($http) {
  let token = null || sessionStorage.getItem('todoToken') || localStorage.getItem('todoToken');

  return {
    get token() {
      return token;
    },
    set token(newToken) {
      token = newToken;
    },
    loginOrRegister,
    getList,
    addItem,
    deleteItem,
  };

  function loginOrRegister(url, username, password) {
    return $http.post(
      `/${url}`,
      {
        username,
        password,
      }
    );
  }

  function getList() {
    return $http({
      method: 'GET',
      url: '/api/lists',
      headers: { 'x-access-token': token },
    });
  }

  function addItem(data) {
    if (data._id) {
      return $http({
        method: 'PUT',
        url: `/api/lists/${data._id}`,
        headers: { 'x-access-token': token },
        data,
      });
    }
    return $http({
      method: 'POST',
      url: '/api/lists',
      headers: { 'x-access-token': token },
      data,
    });
  }

  function deleteItem(id) {
    return $http({
      method: 'DELETE',
      url: `/api/lists/${id}`,
      headers: { 'x-access-token': token },
    });
  }
}
