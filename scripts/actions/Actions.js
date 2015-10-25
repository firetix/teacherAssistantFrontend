var Reflux = require('reflux');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var _ = require("underscore");
var Auth = require('j-toker');
var request = require('superagent');
var Firebase = require('firebase');
var ref = new Firebase(SpoonfullConstants.FirebaseRoot);
var trippsRef = ref.child('tripps');
var homeworksRef = ref.child('homeworks');
var entriesRef = ref.child('entries');
var mediasRef = ref.child('medias');
var reviewsRef = ref.child('reviews');
var Router = require('react-router');
var Navigation = Router.Navigation;

// used to create email hash for gravatar
var hash = require('crypto').createHash('md5');
var Actions = Reflux.createActions({
    // user actions
    'login': {children: ["completed","failed"]},
    'logout': {children: ["completed","failed"]},
    'register': {children: ["completed","failed"]},
    'getWishList': {children: ["completed","failed"]},
    'getBrandList': {children: ["completed","failed"]},
    'registerSuccess': {},
    'registerError': {},
    'validateToken':{},
    'submitAddProduct':{},
    //products
    'getProducts': {},
    'getStudents': {},
    'getProduct': {},
    'updateProducts': {},
    'updateProductReview': {},
    'updateProduct': {},
    'productCreated':{},
    'createProduct':{},
    'updateAccount': {children: ["completed","failed"]},
    'productSelected':{},
    'showRecurrentQuestions':{},
    'goBackDosage':{},
    'showDosageOverview':{},
    'addPhotoUI':{},
    'addNoteUI':{},
    'getProductExperiences':{},
    'listenToProduct':{},
    'listenToUserEntries':{},
    'stopListeningToProduct':{},    
    'listenToReviews':{},
    'stopListeningToReviews':{},

    'createRecommendation': {},
    'recommendationCreated': {},
    'getRecommendation': {},
    'getRecommendationSuccess': {},
    'recommendationUpdated': {},
    'updateRecommendation': {},
    'createReview': {},
    'getReviews': {},
    'showDosageRecommendation':{},
    'addDosageUI':{},
    // post actions
    'upvoteTripp': {},
    'downvoteTripp': {},
    'submitTripp':  {children: ["completed","failed"]},
    'updateTripp': {},
    'updateTrippCompleted':{},
    'deleteTripp': {},
    // comment actions
    'upvoteMedia': {},
    'downvoteMedia': {},
    'updateMediaCount': {},
    'addMedia': {},
    'addReview': {},
    'deleteMedia': {},
    // firebase actions
    'listenToTripp': {},
    'listenToTripps': {},
    'listenToStudents': {},
    'listenToHomeworks': {},
    'listenToExercices': {},
    'listenToEntrie': {},
    'listenToEntries': {},
    'stopListeningToTripps': {},
    'stopListeningToStudents': {},
    'stopListeningToHomeworks': {},
    'stopListeningToExercices': {},
    'stopListeningToEntries': {},
    'stopListeningToTripp': {},
    'stopListeningToEntrie': {},
      // ui actions
    'showModal': {},
    'hideModal': {},
    'goToTripp': {},
    'showLeftNav':{},
      'transitionHome':{},
      'transitionTripps':{},
      'transitionStudents':{},
      'validated':{},
      'addTrippProduct':{},

      'upvoteEntrie': {},
      'downvoteEntrie': {},
      'submitEntrie':  {children: ["completed","failed"]},
      'updateEntrie': {},
      'updateEntrieCompleted':{},
      'deleteEntrie': {},


});
var APIEndpoints = SpoonfullConstants.APIEndpoints;


Auth.configure({
  apiUrl: APIEndpoints.AuthRoot,
  cookieExpiry:10000,
   storage:               'cookies',
  passwordResetSuccessUrl: function() {
    return window.location.href;
  },

  confirmationSuccessUrl: function() {
    return window.location.href;
  },
    parseExpiry: function(headers){
      
    // convert from ruby time (seconds) to js time (millis) 
    return (parseInt(headers['expiry'], 10) * 1000) || null;
  }
});



function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if (res.data) {
    var data = res.data;
    if (data['errors'] && data['errors']['full_messages']) {
      errorMsgs = data['errors'];
    } else if (data['error']) {
      errorMsgs = [data['error']];
    } else {
      errorMsgs = [data['errors']];
    }
  }
  return errorMsgs;
}
/* User Actions
===============================*/

Actions.validateToken.listen(function(){

      Auth.validateToken()
      .then(function(user) {
        Actions.validated(user);
      }.bind(this))
      .fail(function() {
           Actions.transitionHome();
      });
});
Actions.login.listen(function(params) {
  Auth.emailSignIn({
    email: params.email,
    password: params.password,
    is_student:params.is_student
  }).then(function(resp) {
    analytics.identify(resp.data.id, {
      name: resp.data.full_name,
      email: resp.data.email
    });
    this.completed(resp.data);
  }.bind(this)).fail(function(resp) {
    var errorMsgs = _getErrors(resp);
    this.failed(errorMsgs);
  }.bind(this));

});

Actions.createProduct.listen(function(params){
  request.post(APIEndpoints.PRODUCTS)
  .send({product:params})
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.productCreated(json);
      }
    });
});
Actions.getProductExperiences.listen(function(params){

});
Actions.updateAccount.listen(function(params){
  Auth.updateAccount(params).then(function(resp) {
    this.completed(resp.data);
  }.bind(this)).fail(function(resp) {
    var errorMsgs = _getErrors(resp);
    this.failed(errorMsgs);
  }.bind(this));
});

Actions.createRecommendation.listen(function(params){
  request.post(APIEndpoints.RECOMMENDATIONS)
  .send(params)
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.recommendationCreated(json);
      }
    });
});

Actions.updateRecommendation.listen(function(params){
  var parameter = params;
  var recommendationId = parameter.recommendationId;
  delete parameter.recommendationId;
  request.put(APIEndpoints.RECOMMENDATIONS + '/' + recommendationId)
  .send({recommendation:parameter})
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.recommendationUpdated(json);
      }
    });
});


Actions.getRecommendation.listen(function(recommendationId){
  request.get(APIEndpoints.RECOMMENDATIONS + '/' + recommendationId)
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.getRecommendationSuccess(json);
      }
    });
});

Actions.createReview.listen(function(params){
  request.post(APIEndpoints.REVIEWS)
  .send({review:params})
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.recommendationCreated(json);
      }
    });
});



Actions.getReviews.listen(function(productId){
  request.get(APIEndpoints.REVIEWS)
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.getReviewSuccess(json);
      }
    });
});



Actions.logout.listen(function() {
  Auth.signOut().then(function(resp) {
    this.completed(resp.data);
  }.bind(this)).fail(function(resp) {
    var errorMsgs = _getErrors(resp);
    this.failed(errorMsgs);
    Actions.transitionStudents();
  }.bind(this));
});

Actions.register.listen(function(params) {
  Auth.emailSignUp({
      email: params.email,
      full_name: params.full_name,
      password: params.password,
      password_confirmation: params.passwordConfirmation
  })
      .then(function(resp) {
        analytics.identify(resp.data.id, {
          name: resp.data.full_name,
          email: resp.data.email
        });
        this.completed(resp.data);
      }.bind(this))
      .fail(function(resp) {
          var errorMsgs = _getErrors(resp);
          this.failed(errorMsgs);
      }.bind(this));
});
Actions.getWishList.listen(function(products) {
    request.get(APIEndpoints.WishList)
    .query({
      products:products
          })
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.getWishList.completed(json);
      }
    });
});
Actions.getBrandList.listen(function(brands) {
    request.get(APIEndpoints.BrandsSubList)
    .query({
      brands:brands
          })
    .end(function(error, res) {
      if (res) {
        json = JSON.parse(res.text);
        Actions.getBrandList.completed(json);
      }
    });
});



/////////////////////////////

/* Tripp Actions
===============================*/

Actions.submitTripp.listen(function(tripp) {
    var newTrippRef = trippsRef.push(tripp, function(error) {
        if (error) {
            this.failed(error.code);
        } else {
            this.completed(newTrippRef.key());
        }
    }.bind(this));
});

Actions.deleteTripp.preEmit = function(trippId) {
    trippsRef.child(trippId).remove();
};

Actions.upvoteTripp.preEmit = function(userId, trippId) {
    trippsRef.child(trippId).child('upvotes').transaction(function(curr) {
        return (curr || 0) + 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(trippId).set(true);
        }
    });
};

Actions.downvoteTripp.preEmit = function(userId, trippId) {
    trippsRef.child(trippId).child('upvotes').transaction(function(curr) {
        return curr - 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(trippId).remove();
        }
    });
};


///////////////////////////////////
// Entrie Actions//
////////////////////////////
Actions.submitEntrie.listen(function(entrie) {
    var newEntrieRef = entriesRef.push(entrie, function(error) {
        if (error) {
            this.failed(error.code);
        } else {
            this.completed(newEntrieRef.key());
        }
    }.bind(this));
});

Actions.deleteEntrie.preEmit = function(entrieId) {
    entriesRef.child(entrieId).remove();
};

Actions.upvoteEntrie.preEmit = function(userId, entrieId) {
    entriesRef.child(entrieId).child('upvotes').transaction(function(curr) {
        return (curr || 0) + 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(entrieId).set(true);
        }
    });
};

Actions.downvoteEntrie.preEmit = function(userId, entrieId) {
    entriesRef.child(trippId).child('upvotes').transaction(function(curr) {
        return curr - 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(trippId).remove();
        }
    });
};



/* Media Actions
===============================*/

Actions.updateMediaCount.preEmit = function(trippId, n) {
    // updates media count on tripp
    trippsRef.child(trippId).child('mediaCount').transaction(function(curr) {
        return curr + n;
    });
};

Actions.upvoteMedia.preEmit = function(userId, mediaId) {
    mediasRef.child(mediaId).child('upvotes').transaction(function(curr) {
        return (curr || 0) + 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(mediaId).set(true);
        }
    });
};

Actions.downvoteMedia.preEmit = function(userId, mediaId) {
    mediasRef.child(mediaId).child('upvotes').transaction(function(curr) {
        return curr - 1;
    }, function(error, success) {
        if (success) {
            // register upvote in user's profile
            // usersRef.child(userId).child('upvoted').child(mediaId).remove();
        }
    });
};

Actions.addMedia.preEmit = function(media) {
    mediasRef.push(media, function(error) {
        if (error === null) {
            // Actions.updateMediaCount(media.trippId, 1);
        }
    });
};

Actions.addReview.preEmit = function(experience) {
    reviewsRef.push(experience, function(error) {
        if (error === null) {
            // Actions.updateMediaCount(media.trippId, 1);
        }
    });
};
Actions.updateTripp.preEmit = function(tripp) {
  trippsRef.child(tripp.id).set(tripp, function(error) {
      if (error === null) {

      }
  });
};

Actions.deleteMedia.preEmit = function(mediaId, trippId) {
    mediasRef.child(mediaId).remove(function(error) {
        if (error === null) {
            // Actions.updateMediaCount(trippId, -1);
        }
    });
};///////////


module.exports = Actions;
