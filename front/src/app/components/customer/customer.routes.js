angular.module('hogarApp').config(function ($stateProvider) {
    $stateProvider
            .state('customer_login', {
                url: '/iniciar-sesion',
                templateUrl: '/views/customer.login.html',
                controller: 'CustomerController'
            })
            .state('customer_register', {
                url: '/registrarme',
                templateUrl: '/views/customer.register.html',
                controller: 'CustomerController'
            });
});
