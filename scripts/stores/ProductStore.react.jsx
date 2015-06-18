var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SpoonfullConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _products = [];
var _errors = [];
var _product = {
    title: "",
    body: "",
    user: {
        username: ""
    }
};

var ProductStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllProducts: function() {
        return _products;
    },

    getProduct: function() {
        return _product;
    },

    getErrors: function() {
        return _errors;
    }

});

ProductStore.dispatchToken = SpoonfullAppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.type) {

        case ActionTypes.RECEIVE_PRODUCTS:
            _products = action.json.products
            ProductStore.emitChange();
            break;

        case ActionTypes.RECEIVE_CREATED_PRODUCT:
            if (action.json) {
                _products.unshift(action.json.story);
                _errors = [];
            }
            if (action.errors) {
                _errors = action.errors;
            }
            ProductStore.emitChange();
            break;

        case ActionTypes.RECEIVE_PRODUCT:
            if (action.json) {
                _product = action.json.product;
                _errors = [];
            }
            if (action.errors) {
                _errors = action.errors;
            }
            ProductStore.emitChange();
            break;
    }

    return true;
});

module.exports = ProductStore;