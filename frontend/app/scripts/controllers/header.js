
/**
 * @ngdoc function
 * @name psJwtApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the psJwtApp
 */
(function(){
  'use strict';
  angular
    .module('psJwtApp')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$auth'];

  function HeaderCtrl($auth) {
    var vm = this;
    
    vm.isAuthenticated = $auth.isAuthenticated;
  }
})();

