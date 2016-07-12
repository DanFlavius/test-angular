/**
 * Created by dcorde on 24.06.2016.
 */
angular.module('psJwtApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_url) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl',
      controllerAs: 'vm'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })

    .state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller: 'JobsCtrl',
      controllerAs: 'vm'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })
    
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl',
      controllerAs: 'vm'
    })
    
    .state('job', {
      url: '/job',
      templateUrl: '/views/job.html',
      controller: 'JobCtrl',
      controllerAs: 'vm'
    });


  $authProvider.loginUrl = API_url + 'login';
  $authProvider.signupUrl = API_url + 'register';


  $authProvider.google({
    clientId: "301176517881-23357orq9fln8s06ajti9o1rtm03lmag.apps.googleusercontent.com",
    url: API_url + 'auth/google'
  });

  $authProvider.facebook({
    clientId: "1645452609114807",
    url: API_url + 'auth/facebook'
  });

})
  .constant('API_url', 'http://localhost:3000/')

  .run(function ($window) {
    var params = $window.location.search.substring(1);
    console.log(params);
  });
