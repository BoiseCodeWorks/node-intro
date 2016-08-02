; (function () {

  var getId = require('../utils/id-generator')

  var users = {};

  function User(email, password) {
    if (!email || !password) {
      return { error: 'INVALID USER' }
    }
    this.id = getId();
    this.email = email;
    this.password = password;
    users[this.id] = this;
  }

  User.prototype.checkPassword = function (password) {
    if (this.password == password) {
      var result = Object.assign({}, this)
      delete result.password; 
      return result;
    }
    return {error: 'Whoops bad move there bub'}
  }

  function createUser(email, password) {
    if (!email || !password) {
      return { error: 'Sorry you must provide and email and password to register' }
    }

    var error = _checkEmailRegistration(email);

    if (error) {
      return error;
    }
    return new User(email, password);
  }

  function _checkEmailRegistration(email) {
    for (var id in users) {
      var user = users[id];
      if (user.email == email) {
        return { error: 'Sorry that email is not valid for registration' }
      }
    }
  }

  function findUserByEmail(email) {
    for (var id in users) {
      var user = users[id];
      if (user.email == email) {
        return user;
      }
    }
    return { error: 'Sorry no user was found' }
  }


  module.exports = {
    createUser: createUser,
    getUserByEmail: findUserByEmail,
  } 


}());