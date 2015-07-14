var Reflux = require('reflux');
var 
    Router = require('react-router'),
    Transition = Router.Transition,
    Auth = require('j-toker');
    var Actions = require('../../actions/Actions');


var LoginRedicrectionMixin = {
   componentDidMount: function() {
   		Actions.validateToken();
  }};


module.exports = LoginRedicrectionMixin;