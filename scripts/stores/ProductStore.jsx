var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var _ = require('underscore');
var request = require('superagent');
var APIEndpoints = SpoonfullConstants.APIEndpoints;
var productsPerPage = 10;

var ProductStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.productData = {
            product: {},
            reviews: []
        };
    },
    updateProduct: function(productsSnapshot) {
        // products is all products through current page + 1
        // var endAt = this.currentPage * this.perPage;

        // accumulate products in products array
        var product = productsSnapshot;
        this.productData.product = product;
        //
        this.trigger(this.productData);
    },
    updateProductReview:function(reviews){
        this.productData.reviews = reviews || [];
        this.trigger(this.productData);
    },
    getProduct:function(productId){
        request.get(APIEndpoints.PRODUCTS + '/' + productId)
        .end(function(error, res) {
          if (res) {
            json = JSON.parse(res.text);
            Actions.updateProduct(json.product);
          }
        });
    },
    listenToProduct:function(productId){
            this.getProduct(productId);
            Actions.listenToReviews(productId);
    },
    stopListeningToProduct:function(productId) {
       Actions.stopListeningToReviews(productId);
    },
    getDefaultData: function() {
        return {
            productData: this.productData
        };
    }

});

module.exports = ProductStore;