var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var SessionStore = require('../stores/SessionStore.react.jsx');
var StoryStore = require('../stores/StoryStore.react.jsx');
var ProductStore = require('../stores/ProductStore.react.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.jsx');

var router = Router.create({
    routes: routes,
    location: null // Router.HistoryLocation
});

var ActionTypes = SpoonfullConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function() {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getRouter: function() {
        return router;
    },

    redirectHome: function() {
        router.transitionTo('app');
    }
});

RouteStore.dispatchToken = SpoonfullAppDispatcher.register(function(payload) {
    SpoonfullAppDispatcher.waitFor([
        SessionStore.dispatchToken,
        StoryStore.dispatchToken,
        ProductStore.dispatchToken
    ]);

    var action = payload.action;

    switch (action.type) {

        case ActionTypes.REDIRECT:
            router.transitionTo(action.route);
            break;
        case ActionTypes.LOGOUT:
            router.transitionTo('login');
            break;

        case ActionTypes.LOGIN_RESPONSE:
            if (SessionStore.signedIn() && !(action.errors)) {
                router.transitionTo('products');
                // Dirty hack, need to figure this out
                $(document).foundation();
            }
            break;
        case ActionTypes.SIGNUP_RESPONSE:
            router.transitionTo('login');
            break;
        case ActionTypes.RECEIVE_CREATED_STORY:
            router.transitionTo('products');
            break;

        default:
    }

    return true;
});

module.exports = RouteStore;