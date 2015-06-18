var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');

var ActionTypes = SpoonfullConstants.ActionTypes;

module.exports = {

    receiveLogin: function(json, errors) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.LOGIN_RESPONSE,
            json: json,
            errors: errors
        });
    },
    receiveSignup: function(json, errors) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.SIGNUP_RESPONSE,
            json: json,
            errors: errors
        });
    },

    receiveStories: function(json) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_PRODUCTS,
            json: json
        });
    },

    receiveProducts: function(json) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_PRODUCTS,
            json: json
        });
    },
    receiveStory: function(json) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_PRODUCT,
            json: json
        });
    },
    receiveProduct: function(json) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_PRODUCT,
            json: json
        });
    },

    receiveCreatedStory: function(json, errors) {
        SpoonfullAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_CREATED_PRODUCT,
            json: json,
            errors: errors
        });
    }

};