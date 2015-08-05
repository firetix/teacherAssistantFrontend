var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var trippsRef = ref.child('tripps');
var _ = require('underscore');

var trippsPerPage = 10;

var TrippStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.tripps = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;
    },
    listenToTripps: function(params) {
        this.currentPage = params.currentPage;
        trippsRef
        // .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
        // +1 extra post to determine whether another page exists
        .limitToLast((this.currentPage * trippsPerPage) + 1)
            .on('value', this.updateTripps.bind(this));
    },	
    updateTripps: function(trippsData) {
		        // products is all products through current page + 1
        var endAt = this.currentPage * trippsPerPage;

        // accumulate tripps in tripps array
        var tripps = [];
       var trippsSnapshot = trippsData.val();


        _.each(trippsSnapshot,function(tripp,key){
            var tripp = tripp;
            tripp.id = key;
            tripps.unshift(tripp);
        }.bind(this));

        // if extra product doesn't exist, indicate that there are no more tripps
        this.nextPage = (tripps.length === endAt + 1);

        // slice off extra product
        this.tripps = tripps.slice(0, endAt);
        
        this.trigger({
            tripps: this.tripps,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions
        });
    },
    stopListeningToTripps: function() {
        trippsRef.off();
    },
    getDefaultData: function() {
        return {
            tripps: this.tripps,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        };
    }

});

module.exports = TrippStore;