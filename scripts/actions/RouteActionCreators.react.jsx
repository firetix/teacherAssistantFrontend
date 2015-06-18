var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');

var ActionTypes = SpoonfullConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


