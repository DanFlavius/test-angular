/**
 * Created by dcorde on 12.07.2016.
 */
(function () {
  'use strict';

  angular
    .module('psJwtApp')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$http', 'API_url', 'alert'];

  function ContactCtrl($http, API_url, alert) {
    var vm = this;
    vm.users = [];


    $http.get(API_url + 'contact').success(function (res) {
      vm.contacts = res.user;
    }).error(function (res) {
      alert('warning', 'Unable to get jobs! ', res.message)
    });
  }
})();
