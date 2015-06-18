var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Auth = require('j-toker');
var PubSub = require('pubsub');


Auth.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    passwordResetSuccessUrl: function() {
        return window.location.href;
    },

    confirmationSuccessUrl: function() {
        return window.location.href;
    },
});

var ActionTypes = SpoonfullConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _user = Auth.user;
var _is_signedIn = Auth.user.signedIn;
var _config_name = Auth.user.configName;
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    signedIn: function() {
        return _is_signedIn ? true : false;
    },

    getConfigName: function() {
        return _config_name;
    },
    getUser: function() {
        return _user;
    },

    getErrors: function() {
        return _errors;
    }

});

SessionStore.dispatchToken = SpoonfullAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.type) {

        case ActionTypes.LOGIN_RESPONSE:
            // debugger;
            // PubSub.subscribe('auth', function() {
            //     debugger;
            // }.bind(this));
            _user = Auth.user;
            _is_signedIn = Auth.user.signedIn;
            if (action.errors) {
                _errors = action.errors;
            } else {
                _errors = [];
            }
            SessionStore.emitChange();
            break;
        case ActionTypes.SIGNUP_RESPONSE:
            // debugger;
            // PubSub.subscribe('auth', function() {
            //     debugger;
            // }.bind(this));
            _user = Auth.user;
            _is_signedIn = Auth.user.signedIn;
            if (action.errors) {
                _errors = action.errors;
            } else {
                _errors = [];
            }
            SessionStore.emitChange();
            break;


        case ActionTypes.LOGOUT:
            _user = {
            	signedIn:false
            };
            _is_signedIn = null;
            Auth.signOut().then(function() {
                SessionStore.emitChange();
            });
            break;

        default:
    }

    return true;
});

module.exports = SessionStore;