var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var Firebase = require('firebase');
var ref = new Firebase('https://luminous-fire-7725.firebaseio.com/');
var trippsRef = ref.child('tripps');
var mediasRef = ref.child('medias');
var _ = require('underscore');

// store listener references
var trippListener, mediaListener;

var TrippStore = Reflux.createStore({

    listenables: Actions,

    init:function() {
        this.trippData = {
            tripp: {},
            medias: [],
            products:[]
        };
    },

    listenToTripp:function(trippId) {
        trippListener = trippsRef
            .child(trippId)
            .on('value', this.updateTripp.bind(this));

        mediaListener = mediasRef
            .orderByChild('trippId')
            .equalTo(trippId)
            .on('value', this.updateMedias.bind(this));
    },

    updateTripp:function(trippData) {
        var tripp = trippData.val();

        if (tripp) {
            tripp.id = trippData.key();
            this.trippData.tripp = tripp;
        } else {
            // tripp doesn't exist or was deleted
            this.trippData.tripp = {
                isDeleted: true
            };
        }

        this.trigger(this.trippData);
    },
    updateTrippCompleted:function(trippId,trippData){
        _.extend(this.trippData,trippData);
        this.trigger(this.trippData);
    },
    updateMedias:function(mediasData) {
        this.trippData.medias = [];
        var medias = mediasData.val();
        _.each(medias,function(mediaData,key){
            var media = mediaData;
            media.id = key;
            this.trippData.medias.unshift(media);
        }.bind(this));

        this.trigger(this.trippData);
    },

    stopListeningToTripp:function(trippId) {
        if (!this.trippData.tripp.isDeleted) {
            trippsRef.child(trippId)
                .off('value', trippListener);
        }

        mediasRef.off('value', mediaListener);
    },

    getDefaultData:function() {
        return this.trippData;
    }

});

module.exports = TrippStore;
