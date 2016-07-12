

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the psJwtApp
 */
(function(){
  'use strict';

  angular
    .module('psJwtApp')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['alert', '$auth', '$state'];

  function RegisterCtrl(alert, $auth, $state) {
  var vm = this;

    vm.submit = function(){
      $auth.signup({email: vm.email, password: vm.password})
        .then(function (res) {
          alert('success', 'Account created! ', 'Welcome ' + res.data.user.email + '!');
          $state.go('main');
        })
        .catch(function (err) {
          alert('warning', 'Your email already exists. Please register with another one!', err.message);
        });
    };
  }

})();

