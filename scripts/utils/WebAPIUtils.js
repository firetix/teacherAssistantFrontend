var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var request = require('superagent');
var _ = require("underscore");

function _getErrors(res) {
    var errorMsgs = ["Something went wrong, please try again"];
    if (res.data) {
        var data = res.data;
        if (data['errors'] && data['errors']['full_messages']) {
            errorMsgs = [data['errors']['full_messages']];
        } else if (data['error']) {
            errorMsgs = [data['error']];
        } else {
            errorMsgs = [data['errors']];
        }
    }
    return errorMsgs;
}
var Auth = require('j-toker');
var APIEndpoints = SpoonfullConstants.APIEndpoints;

module.exports = {

    signup: function(email, username, password, passwordConfirmation) {
        Auth.emailSignUp({
            email: email,
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        })
            .then(function(resp) {
                ServerActionCreators.receiveSignup(resp.data, null);
            }.bind(this))
            .fail(function(resp) {
                var errorMsgs = _getErrors(resp);
                ServerActionCreators.receiveSignup(null, errorMsgs);
            }.bind(this));
    },

    login: function(email, password) {
        Auth.emailSignIn({
            email: email,
            password: password
        }).then(function(resp) {
            ServerActionCreators.receiveLogin(resp.data, null);
        }.bind(this)).fail(function(resp) {
            var errorMsgs = _getErrors(resp);
            ServerActionCreators.receiveLogin(null, errorMsgs);
        }.bind(this));
    },

    loadProducts: function() {
        request.get(APIEndpoints.PRODUCTS).end(function(error, res) {
            if (res) {
                json = JSON.parse(res.text);
                console.log(json.products);
                ServerActionCreators.receiveProducts(json);
            }
        });
    },
    loadProduct: function(productId) {
        request.get(APIEndpoints.PRODUCTS + '/' + productId)
            .end(function(error, res) {
                if (res) {
                    json = JSON.parse(res.text);
                    ServerActionCreators.receiveProduct(json);
                }
            });
    },

    // loadStory: function(storyId) {
    //   request.get(APIEndpoints.STORIES + '/' + storyId)
    //     .set('Accept', 'application/json')
    //     .set('Authorization', sessionStorage.getItem('accessToken'))
    //     .end(function(error, res){
    //       if (res) {
    //         json = JSON.parse(res.text);
    //         ServerActionCreators.receiveStory(json);
    //       }
    //     });
    // },

    // createStory: function(title, body) {
    //   request.post(APIEndpoints.STORIES)
    //     .set('Accept', 'application/json')
    //     .set('Authorization', sessionStorage.getItem('accessToken'))
    //     .send({ story: { title: title, body: body } })
    //     .end(function(error, res){
    //       if (res) {
    //         if (res.error) {
    //           var errorMsgs = _getErrors(res);
    //           ServerActionCreators.receiveCreatedStory(null, errorMsgs);
    //         } else {
    //           json = JSON.parse(res.text);
    //           ServerActionCreators.receiveCreatedStory(json, null);
    //         }
    //       }
    //     });
    // }

};