(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name psJwtApp.controller:JobsCtrl
   * @description
   * # JobsCtrl
   * Controller of the psJwtApp
   */
  angular
    .module('psJwtApp')
    .controller('JobsCtrl', JobsCtrl);

  JobsCtrl.$inject = ['$http', 'API_url', 'alert'];

  function JobsCtrl($http, API_url, alert) {
    var vm = this;

    $http.get(API_url + 'jobs').success(function (res) {
      vm.jobs = res.user.jobs;
    }).error(function (res) {
      alert('warning', 'Unable to get jobs! ', res.message)
    });
  }

})();
