angular.module('hogarApp').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/iniciar-sesion');
});
