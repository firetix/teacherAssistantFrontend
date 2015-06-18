var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000/api/v1";

module.exports = {

    APIEndpoints: {
       
        USER: APIRoot + "/users",
        STORIES: APIRoot + "/stories",
        PRODUCTS: APIRoot + "/products"
    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,
        SIGNUP_REQUEST: null,
        SIGNUP_RESPONSE: null,

        // Routes
        REDIRECT: null,

        LOAD_STORIES: null,
        RECEIVE_STORIES: null,
        LOAD_STORY: null,
        RECEIVE_STORY: null,
        CREATE_STORY: null,
        RECEIVE_CREATED_STORY: null,

        LOAD_PRODUCTS: null,
        RECEIVE_PRODUCTS: null,
        LOAD_PRODUCT: null,
        RECEIVE_PRODUCT: null,
        CREATE_PRODUCT: null,
        RECEIVE_CREATED_PRODUCT: null


    })

};