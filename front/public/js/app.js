var env = 'aa';var deps = ['ui.router', 'ngResource', 'ngMaterial', 'angular-storage'];

angular.module('hogarApp', deps);

angular.module('hogarApp').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
            .state('report_customer_map', {
                url: '/',
                templateUrl: '/views/customer.map.html',
                controller: 'CustomerController'
            })
            .state('report_create', {
                url: '/reportar',
                templateUrl: 'views/report.create.html',
                controller: 'ReportController'
            });
}]);

angular.module('hogarApp').factory('CustomerService', ["Customer", function(Customer){

  var customer = Customer;

  var login = function(callback){
      Customer.logedIn = true;
      callback();
  }

  var register = function(callback){
    consol
  }

  return {
      login : login,
      customer : this.customer
  }

}])

angular.module('hogarApp').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
            .state('customer_login', {
                url: '/iniciar-sesion',
                templateUrl: '/views/customer.login.html',
                controller: 'CustomerController',
                authenticate: true
            })
            .state('customer_register', {
                url: '/registrarme',
                templateUrl: '/views/customer.register.html',
                controller: 'CustomerController',
                authenticate: true
            });
}]);

angular.module('hogarApp').factory('Customer', function(){
  var user;
  var password;
  var password2;
  var type;

  var logedIn = false;

  return {
    email : this.user,
    password : this.password,
    password2 : this.password2,
    logedIn : this.logedIn,
    type : 'customer'
  }



})

angular.module('hogarApp').controller('CustomerController', ["$scope", "$state", "CustomerService", "Customer", function ($scope, $state, CustomerService, Customer) {

    $scope.customer = Customer;
    $scope.login = function () {
        var callback = function () {
            if (Customer.type == 'organization') {
                $state.go('report_organization_map');
            }
            $state.go('report_customer_map');
        }

        CustomerService.login(callback);
    }

    $scope.logout = function () {
        console.log('ME ESTOY TRATANDO DE DESLOGUEAR');
    }

    $scope.register = function () {
        var callback = function () {
            if (Customer.type == 'organization') {
                $state.go('report_organization_map');
            }
            $state.go('report_customer_map');
        }

        CustomerService.register(callback);
    }
}])

angular.module('hogarApp').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/registrarme');
}]);

angular.module('hogarApp').run(["$httpBackend", "$http", function ($httpBackend, $http) {

}]);
angular.bootstrap(document, ['hogarApp']);