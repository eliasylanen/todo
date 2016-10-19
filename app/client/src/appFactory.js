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
}
