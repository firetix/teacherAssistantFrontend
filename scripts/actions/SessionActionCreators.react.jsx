var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SpoonfullConstants.ActionTypes;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login: function(email, password) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

