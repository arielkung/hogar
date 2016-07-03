var env = 'aa';var deps = ['ui.router', 'ngResource', 'ngMaterial', 'uiGmapgoogle-maps'];

angular.module('hogarApp', deps)
.config(["$mdThemingProvider", function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('orange');
}]);

angular.module('hogarApp').config(["$stateProvider", function ($stateProvider) {
    $stateProvider
            .state('report_customer_map', {
                url: '/',
                templateUrl: '/views/customer.map.html',
                controller: 'ReportController'
            })
            .state('report_create', {
                url: '/reportar',
                templateUrl: 'views/report.create.html',
                controller: 'ReportController'
            })
            .state('report_success', {
                url: '/reportar/success',
                templateUrl: 'views/report.success.html',
                controller: 'ReportController'
            })

}]);

angular.module('hogarApp').controller('ReportController', ["$scope", "$rootScope", "$state", function ($scope, $rootScope, $state) {
    var selection = {
        gender: '',
        ageRange: ''
    }

    var selectionCollection = [];
    var needsCollection = [];

    if ($rootScope.report == undefined) {
        $rootScope.report = {
            position: '',
            selectionCollection: [],
            needsCollection: []
        }
    }

    var position = "";

    function cleanSelection() {
        selection.gender = '';
        selection.ageRange = '';
    }

    $scope.setGender = function (gender) {
        selection.gender = gender;
    }

    $scope.setAgeRange = function (ageRange) {
        selection.ageRange = ageRange;

        if (selection.gender && selection.ageRange) {
            selectionCollection.push({
                gender: selection.gender,
                ageRange: selection.ageRange
            });
        }

        cleanSelection();
    }

    $scope.newReport = function () {
        position = '123,123.312.123';
        $rootScope.report.position = position;
        $state.go('report_create');
    }

    $scope.doReport = function () {
        $rootScope.report.selectionCollection = selectionCollection;
        $rootScope.report.needCollection = [];
        ['elder', 'shoes', 'coat', 'food'].forEach(function (el) {
            if (needsCollection[el]) {
                $rootScope.report.needsCollection.push(el);
            }
        });
        $state.go('report_success');

    }

    $scope.toggleNeed = function (need) {
        if (needsCollection[need]) {
            delete needsCollection[need];
        } else {
            needsCollection[need] = true;
        }
        console.log(needsCollection);
    }

    $scope.map = { center: { latitude: -34.603527, longitude: -58.382279}, zoom: 9 };

    $scope.position = position;
    $scope.report = $rootScope.report;
    $scope.selection = selection;
    $scope.selectionCollection = selectionCollection;
    $scope.needsCollection = needsCollection;
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
                controller: 'CustomerController'
            })
            .state('customer_register', {
                url: '/registrarme',
                templateUrl: '/views/customer.register.html',
                controller: 'CustomerController'
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
    $urlRouterProvider.otherwise('/iniciar-sesion');
}]);

'use strict';

/**
 * @ngdoc directive
 * @name locationApp.directive:placeAutocomplete
 * @description
 *
 * # An element directive that provides a dropdown of
 * location suggestions based on the search string.
 * When an item is selected, the location's latitude
 * and longitude are determined.
 *
 * This directive depends on the Google Maps API
 * with the places library
 *
 * <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
 *
 * Usage:
 * <place-autocomplete ng-model="selectedLocation"></place-autocomplete>
 *
 * Credit:
 * http://stackoverflow.com/a/31510437/293847
 */
angular.module('hogarApp')
  .directive('placeAutocomplete', function() {
    return {
      templateUrl: 'views/place-autocomplete.html',
      restrict: 'E',
      replace: true,
      scope: {
        'ngModel': '='
      },
      controller: ["$scope", "$q", function($scope, $q) {
        if (!google || !google.maps) {
          throw new Error('Google Maps JS library is not loaded!');
        } else if (!google.maps.places) {
          throw new Error('Google Maps JS library does not have the Places module');
        }
        var options = {componentRestrictions : {country : 'AR'}};
        var autocompleteService = new google.maps.places.AutocompleteService(null, options);
        var map = new google.maps.Map(document.createElement('div'));
        var placeService = new google.maps.places.PlacesService(map, options);
        $scope.ngModel = {};

        /**
         * @ngdoc function
         * @name getResults
         * @description
         *
         * Helper function that accepts an input string
         * and fetches the relevant location suggestions
         *
         * This wraps the Google Places Autocomplete Api
         * in a promise.
         *
         * Refer: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
         */
        var getResults = function(address) {
          var deferred = $q.defer();
          autocompleteService.getQueryPredictions({
            input: address
          }, function(data) {
            deferred.resolve(data);
          });
          return deferred.promise;
        };

        /**
         * @ngdoc function
         * @name getDetails
         * @description
         * Helper function that accepts a place and fetches
         * more information about the place. This is necessary
         * to determine the latitude and longitude of the place.
         *
         * This wraps the Google Places Details Api in a promise.
         *
         * Refer: https://developers.google.com/maps/documentation/javascript/places#place_details_requests
         */
        var getDetails = function(place) {
          var deferred = $q.defer();
          placeService.getDetails({
            'placeId': place.place_id
          }, function(details) {
            deferred.resolve(details);
          });
          return deferred.promise;
        };

        $scope.search = function(input) {
          if (!input) {
            return;
          }
          return getResults(input).then(function(places) {
            return places;
          });
        };
        /**
         * @ngdoc function
         * @name getLatLng
         * @description
         * Updates the scope ngModel variable with details of the selected place.
         * The latitude, longitude and name of the place are made available.
         *
         * This function is called every time a location is selected from among
         * the suggestions.
         */
        $scope.getLatLng = function(place) {
          if (!place) {
            $scope.ngModel = {};
            return;
          }
          getDetails(place).then(function(details) {
            $scope.ngModel = {
              'name': place.description,
              'latitude': details.geometry.location.lat(),
              'longitude': details.geometry.location.lng(),
            };
          });
        }
      }]
    };
  });

angular.module('hogarApp').run(["$httpBackend", "$http", function ($httpBackend, $http) {

}]);

// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', ["$http", function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){

            // Clears the holding array of locations
            locations = [];

           
                initialize(latitude, longitude);
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Username</b>: ' + user.username +
                    '<br><b>Age</b>: ' + user.age +
                    '<br><b>Gender</b>: ' + user.gender +
                    '<br><b>Favorite Language</b>: ' + user.favlang +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favlang: user.favlang
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };

// Initializes the map
var initialize = function(latitude, longitude) {

    // Uses the selected lat, long as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLong};

    // If map has not been created already...
    if (!map){

        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: myLatLng
        });
    }

    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    // Set initial location as a bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

};

// Refresh the page upon window load. Use the initial latitude and longitude
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
}]);
angular.bootstrap(document, ['hogarApp']);