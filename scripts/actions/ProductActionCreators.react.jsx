var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SpoonfullConstants.ActionTypes;

module.exports = {

  loadProducts: function() {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_PRODUCTS
    });
    WebAPIUtils.loadProducts();
  },
  
  loadProduct: function(productId) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_PRODUCT,
      productId: productId
    });
    WebAPIUtils.loadProduct(productId);
  },

  createStory: function(title, body) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_STORY,
      title: title,
      body: body
    });
    WebAPIUtils.createProduct(title, body);
  }

};

