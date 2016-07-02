angular.module('hogarApp').controller('CustomerController', function ($scope, $state, CustomerService, Customer) {

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
})
