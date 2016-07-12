(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name psJwtApp.controller:LoginCtrl
   * @description
   * # LoginCtrl
   * Controller of the psJwtApp
   */
  angular
    .module('psJwtApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['alert', '$auth', '$state'];

  function LoginCtrl(alert, $auth, $state) {
    var vm = this;

    vm.submit = function () {
      $auth.login({email: vm.email, password: vm.password})
        .then(function (res) {
          alert('success', 'Welcome ', 'Thanks for coming back ' + res.data.user.email + '!');
          $state.go('main')
        })
        .catch(handleError);
    };

    vm.authenticate = function(provider){
      $auth.authenticate(provider).then(function(res){
        alert('success', 'Welcome', 'Thanks for coming back ' + res.data.user.displayName + '!');
        $state.go('main');
      }, handleError);
    };

    function handleError(err){
      alert('warning', 'Something went wrong:(', err.message);
    }
  }

})();
