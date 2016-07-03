var deps = ['ui.router', 'ngResource', 'ngMaterial'];

angular.module('hogarApp', deps)
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('orange');
});