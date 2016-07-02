angular.module('hogarApp').factory('CustomerService', function(Customer){

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

})
