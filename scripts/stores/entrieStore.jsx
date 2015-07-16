var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var Firebase = require('firebase');
var ref = new Firebase('https://luminous-fire-7725.firebaseio.com/');
var entriesRef = ref.child('entries');
var mediasRef = ref.child('medias');
var _ = require('underscore');

// store listener references
var entrieListener, mediaListener;

var EntrieStore = Reflux.createStore({

    listenables: Actions,

    init:function() {
        this.entrieData = {
            entrie: {},
            medias: [],
            products:[]
        };
    },

    listenToEntrie:function(entrieId) {
        entrieListener = entriesRef
            .child(entrieId)
            .on('value', this.updateEntrie.bind(this));

        mediaListener = mediasRef
            .orderByChild('entrieId')
            .equalTo(entrieId)
            .on('value', this.updateMedias.bind(this));
    },

    updateEntrie:function(entrieData) {
        var entrie = entrieData.val();

        if (entrie) {
            entrie.id = entrieData.key();
            this.entrieData.entrie = entrie;
        } else {
            // entrie doesn't exist or was deleted
            this.entrieData.entrie = {
                isDeleted: true
            };
        }

        this.trigger(this.entrieData);
    },
    updateEntrieCompleted:function(entrieId,entrieData){
        _.extend(this.entrieData,entrieData);
        this.trigger(this.entrieData);
    },
    updateMedias:function(mediasData) {
        this.entrieData.medias = [];
        var medias = mediasData.val();
        _.each(medias,function(mediaData,key){
            var media = mediaData;
            media.id = key;
            this.entrieData.medias.unshift(media);
        }.bind(this));

        this.trigger(this.entrieData);
    },

    stopListeningToEntrie:function(entrieId) {
        if (!this.entrieData.entrie.isDeleted) {
            entriesRef.child(entrieId)
                .off('value', entrieListener);
        }

        mediasRef.off('value', mediaListener);
    },

    getDefaultData:function() {
        return this.entrieData;
    }

});

module.exports = EntrieStore;
