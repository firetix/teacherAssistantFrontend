var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var reviewsRef = ref.child('reviews');
var _ = require('underscore');
var EntrieStore = require('./entrieStore.jsx');

var reviewsPerPage = 10;
// store listener references
var reviewListener;

var ReviewsStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.reviews = [];
        this.initiated = false;
    },
    listenToReviews: function(productId) {
        reviewListener = reviewsRef
            .orderByChild('productId')
            .equalTo(productId)
            .on('value', this.updateReviews.bind(this));
    },
    updateReviews: function(reviewsData) {
        this.reviews = [];
        var reviews = reviewsData.val();
        _.each(reviews,function(experienceData,key){
            var experience = experienceData;
            experience.id = key;
            this.reviews.unshift(experience);
        }.bind(this));
        Actions.updateProductReview(reviews);
    },
    stopListeningToReviews: function(productId) {
        reviewsRef.off('value',reviewListener);
    },
    getDefaultData: function() {
        return {
            reviews: this.reviews
        };
    }

});

module.exports = ReviewsStore;