var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var _ = require('underscore');

var productsPerPage = 10;

var DosageStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.dosageData = {
            recommendation: {}
        };
    },
    recommendationCreated: function(params) {
        this.dosageData.recommendation = params;
        this.trigger("recommendationSuccess",this.dosageData);
    },
    getRecommendationSuccess: function(params) {
        this.dosageData.recommendation = params;
        this.trigger("getRecommendationSuccess",this.dosageData);
    },
    recommendationUpdated: function(params) {
        this.dosageData.recommendation = params;
        this.trigger("recommendationUpdated",this.dosageData);
    },
    getDefaultData: function() {
        return this.dosageData;
    }

});

module.exports = DosageStore;