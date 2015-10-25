var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var studentsRef = ref.child('students');
var _ = require('underscore');

var studentsPerPage = 10;

var StudentStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.students = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;
    },
    listenToStudents: function(params) {
        this.currentPage = params.currentPage;
        studentsRef
        // .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
        // +1 extra post to determine whether another page exists
        .limitToLast((this.currentPage * studentsPerPage) + 1)
            .on('value', this.updateStudents.bind(this));
    },  
    updateStudents: function(studentsData) {
                // products is all products through current page + 1
        var endAt = this.currentPage * studentsPerPage;

        // accumulate students in students array
        var students = [];
       var studentsSnapshot = studentsData.val();


        _.each(studentsSnapshot,function(tripp,key){
            var tripp = tripp;
            tripp.id = key;
            students.unshift(tripp);
        }.bind(this));

        // if extra product doesn't exist, indicate that there are no more students
        this.nextPage = (students.length === endAt + 1);

        // slice off extra product
        this.students = students.slice(0, endAt);
        
        this.trigger({
            students: this.students,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions
        });
    },
    stopListeningToStudents: function() {
        studentsRef.off();
    },
    getDefaultData: function() {
        return {
            students: this.students,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage
        };
    }

});

module.exports = StudentStore;