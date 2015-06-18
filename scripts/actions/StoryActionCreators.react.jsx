var SpoonfullAppDispatcher = require('../dispatcher/SpoonfullAppDispatcher.js');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SpoonfullConstants.ActionTypes;

module.exports = {

  loadStories: function() {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORIES
    });
    WebAPIUtils.loadStories();
  },
  
  loadStory: function(storyId) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORY,
      storyId: storyId
    });
    WebAPIUtils.loadStory(storyId);
  },

  createStory: function(title, body) {
    SpoonfullAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_STORY,
      title: title,
      body: body
    });
    WebAPIUtils.createStory(title, body);
  }

};

