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
