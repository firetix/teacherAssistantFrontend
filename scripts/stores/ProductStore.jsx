var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var _ = require('underscore');

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

        //
        this.trigger({
                product: product,
                reviews:[]
        });
    },
    getDefaultData: function() {
        return {
            productData: this.productData
        };
    }

});

module.exports = ProductStore;