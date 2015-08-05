var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var entriesRef = ref.child('entries');
var entriesPersonalRef = ref.child('entries');
var _ = require('underscore');

var entriesPerPage = 25;

var EntriesStore = Reflux.createStore({

    listenables: Actions,

    init: function() {
        this.entries = [];
        this.currentPage = 1;
        this.nextPage = true;
        this.perPage = 25;

        this.personalEntries = [];
        this.currentPagePersonal = 1;
        this.nextPagePersonal = true;
        this.perPagePersonal = 25;
    },
    listenToEntries: function(params) {
        this.currentPage = params.currentPage;
        entriesRef
        // .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
        // +1 extra post to determine whether another page exists
        .limitToLast((this.currentPage * entriesPerPage) + 1)
            .on('value', this.updateEntries.bind(this));
    },	
    listenToUserEntries: function(params) {
        var _this = this;
        this.currentPage = params.currentPage;
        entriesPersonalRef.orderByChild('creatorId')
        .startAt(params.creatorId)
        .endAt(params.creatorId).on('value',this.updateEntriesUser.bind(this));
    },  
    updateEntries: function(entriesData) {
		        // products is all products through current page + 1
        var endAt = this.currentPage * entriesPerPage;

        // accumulate entries in entries array
        var entries = [];
       var entriesSnapshot = entriesData.val();


        _.each(entriesSnapshot,function(tripp,key){
            var tripp = tripp;
            tripp.id = key;
            entries.unshift(tripp);
        }.bind(this));

        // if extra product doesn't exist, indicate that there are no more entries
        this.nextPage = (entries.length === endAt + 1);
        // slice off extra product
        this.entries = entries.slice(0, endAt);
        
        this.trigger({
            entries: this.entries,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            personalEntries: this.personalEntries,
            sortOptionsPersonal: this.sortOptionsPersonal,
            nextPagePersonal: this.nextPagePersonal,
            currentPagePersonal: this.currentPagePersonal,
            perPagePersonal: this.perPagePersonal
        });
    },
    updateEntriesUser: function(entriesData) {
                    // products is all products through current page + 1
            var endAt = this.currentPagePersonal * entriesPerPage;

            // accumulate entries in entries array
            var entries = [];
           var entriesSnapshot = entriesData.val();


            _.each(entriesSnapshot,function(tripp,key){
                var tripp = tripp;
                tripp.id = key;
                entries.unshift(tripp);
            }.bind(this));

            // if extra product doesn't exist, indicate that there are no more entries
            this.nextPagePersonal = (entries.length === endAt + 1);
            // slice off extra product
            this.personalEntries = entries.slice(0, endAt);
            
            this.trigger({
                entries: this.entries,
                currentPage: this.currentPage,
                nextPage: this.nextPage,
                sortOptions: this.sortOptions,
                personalEntries: this.personalEntries,
                sortOptionsPersonal: this.sortOptionsPersonal,
                nextPagePersonal: this.nextPagePersonal,
                currentPagePersonal: this.currentPagePersonal,
                perPagePersonal: this.perPagePersonal
            });
        },
    stopListeningToEntries: function() {
        entriesRef.off();
    },
    stopListeningToEntriesUser: function() {
        entriesPersonalRef.off();
    },
    getDefaultData: function() {
        return {
            entries: this.entries,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            sortOptions: this.sortOptions,
            perPage: this.perPage,
            personalEntries: this.personalEntries,
            sortOptionsPersonal: this.sortOptionsPersonal,
            nextPagePersonal: this.nextPagePersonal,
            currentPagePersonal: this.currentPagePersonal,
            perPagePersonal: this.perPagePersonal
        };
    }

});

module.exports = EntriesStore;