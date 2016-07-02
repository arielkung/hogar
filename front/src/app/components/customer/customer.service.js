angular.module('hogarApp').factory('CustomerService', function (Customer) {

    var customer = Customer;

    var login = function (callback) {
        Customer.logedIn = true;
        callback();
    }

    var register = function (callback) {
        Customer.logedIn = true;
        callback();
    }

    return {
        login: login,
        register : register,
        customer: this.customer
    }

})
