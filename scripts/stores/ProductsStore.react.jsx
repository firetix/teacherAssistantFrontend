var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var _ = require('underscore');

var productsPerPage = 10;

var ProductsStore = Reflux.createStore({

    listenables: Actions,

    init:function() {
        this.products = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;
    },
    listenToProducts:function(pageNum) {
        this.currentPage = pageNum;
    },
    stopListeningToProducts:function() {
        // productsRef.off();
    },
    updateProducts:function(productsSnapshot) {
        // products is all products through current page + 1
        var endAt = this.currentPage * this.perPage;

        // accumulate products in products array
        var products = productsSnapshot;
        //
        // if extra product doesn't exist, indicate that there are no more products
        this.nextPage = (products.length === endAt + 1);

        // slice off extra product
        this.products = products.slice(0, endAt);
        //
        this.trigger({
            products: this.products,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        });
    },
    getDefaultData:function() {
        return {
            products: this.products,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        };
    }

});

module.exports = ProductsStore;