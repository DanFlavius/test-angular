'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the psJwtApp
 */
(function(){
  angular.module('psJwtApp')
    .controller('LogoutCtrl', LogoutCtrl);

  LogoutCtrl.$inject = ['$auth', '$state'];

  function LogoutCtrl($auth, $state) {
    $auth.logout();
    $state.go('main');
  }
})();
