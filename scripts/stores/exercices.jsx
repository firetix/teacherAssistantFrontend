var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var exercieRef = ref.child('exercices');
var _ = require('underscore');

var exerciePerPage = 10;

var HomeworkStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.exercie = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;
    },
    listenToExercices: function(params) {
        this.currentPage = params.currentPage;
        exercieRef
        // .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
        // +1 extra post to determine whether another page exists
        .limitToLast((this.currentPage * exerciePerPage) + 1)
            .on('value', this.updateExercices.bind(this));
    },  
    updateExercices: function(exercieData) {
                // products is all products through current page + 1
        var endAt = this.currentPage * exerciePerPage;

        // accumulate exercie in exercie array
        var exercie = [];
       var exercieSnapshot = exercieData.val();


        _.each(exercieSnapshot,function(tripp,key){
            if(tripp){
            var obj = {
                id: key,
                answer:tripp.answer,
                desc:tripp.desc,
                estimated_time:tripp.estimated_time,
                title:tripp.title,
                exercicesId:tripp.exercicesId,
            };
            
            exercie.unshift(obj);
        }
        }.bind(this));

        // if extra product doesn't exist, indicate that there are no more exercie
        this.nextPage = (exercie.length === endAt + 1);

        // slice off extra product
        this.exercie = exercie.slice(0, endAt);
        this.trigger({
            exercie: this.exercie,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions
        });
    },
    stopListeningToExercices: function() {
        exercieRef.off();
    },
    getDefaultData: function() {
        return {
            exercie: this.exercie,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        };
    }

});

module.exports = HomeworkStore;