var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var _ = require('underscore');
var request = require('superagent');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var productsPerPage = 10;

var APIEndpoints = SpoonfullConstants.APIEndpoints;
var ProductsStore = Reflux.createStore({

    listenables: Actions,

    init:function() {
        this.products = [];
        this.currentPage = 0;
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
        var _this = this;
        if(productsSnapshot.currentPage == 1){
            this.products = [];
        }
        // products is all products through current page + 1
        this.currentPage =productsSnapshot.currentPage*1;
        var endAt = this.currentPage * this.perPage;

        // accumulate products in products array
        var products = productsSnapshot.products;
        //
        // slice off extra product
        _.each(products,function(product){
            _this.products.push(product)
        });

        // if extra product doesn't exist, indicate that there are no more products
        this.nextPage = (this.products.length === endAt + 1);

        // slice off extra product
        this.products = this.products.slice(0, endAt);
        //
        this.trigger({
            products: this.products,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        });
    },
    getProducts:function(params){
            request.get(APIEndpoints.PRODUCTS)
                .query({
                    per_page: params.perPage + 1,
                    page: params.currentPage,
                    search_term: params.searchTerm
                })
                .end(function(error, res) {
                    if (res) {
                        json = JSON.parse(res.text);
                        // console.log(json.products);
                        Actions.updateProducts({
                            products: json.data,
                            currentPage:json.page,
                            perPage:json.per_page
                        });
                    }
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