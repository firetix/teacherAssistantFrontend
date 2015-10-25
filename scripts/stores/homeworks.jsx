var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var homeworkRef = ref.child('homeworks');
var _ = require('underscore');

var homeworkPerPage = 10;

var HomeworkStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.homework = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;
    },
    listenToHomeworks: function(params) {
        this.currentPage = params.currentPage;
        homeworkRef
        // .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
        // +1 extra post to determine whether another page exists
        .limitToLast((this.currentPage * homeworkPerPage) + 1)
            .on('value', this.updateHomeworks.bind(this));
    },  
    updateHomeworks: function(homeworkData) {
                // products is all products through current page + 1
        var endAt = this.currentPage * homeworkPerPage;

        // accumulate homework in homework array
        var homework = [];
       var homeworkSnapshot = homeworkData.val();


        _.each(homeworkSnapshot,function(tripp,key){
            var tripp = tripp;
            tripp.id = key;
            homework.unshift(tripp);
        }.bind(this));

        // if extra product doesn't exist, indicate that there are no more homework
        this.nextPage = (homework.length === endAt + 1);

        // slice off extra product
        this.homework = homework.slice(0, endAt);
        this.trigger({
            homework: this.homework,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions
        });
    },
    stopListeningToHomeworks: function() {
        homeworkRef.off();
    },
    getDefaultData: function() {
        return {
            homework: this.homework,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        };
    }

});

module.exports = HomeworkStore;