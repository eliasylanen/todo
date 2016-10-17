angular
  .module('todoApp')
  .factory('appFactory', appFactory);

appFactory.$inject = ['$http'];
function appFactory($http) {
  return {
    getList,
  };

  function getList(token) {
    return $http({
      method: 'GET',
      url: '/api/lists',
      headers: { 'x-access-token': token },
    });
  }
}
