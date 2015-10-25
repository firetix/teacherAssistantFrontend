// actions
var Actions = require('../../actions/Actions');
// components
var Upvote = require('../UpVote.jsx');
var Link = require('react-router').Link;
var moment = require('moment');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  ListDivider = mui.ListDivider,
  Colors = mui.Styles.Colors,
  Avatar = mui.Avatar,
  IconButton = mui.IconButton,
  ListItem = mui.ListItem;


var Review = React.createClass({

    propTypes: {
        user: React.PropTypes.object,
        review: React.PropTypes.object
    },
    onReviewselected:function(){

    },
    render:function() {
        var user = this.props.user;
        var review = this.props.review;
        var source = "";
        return ( 
                 <div >
                      <div className="row">
                          <div className="col-xs-2">
                            <IconButton iconClassName="fa fa-pencil-square-o"/>
                         </div>
                         <div className="col-xs-8">
                            <span style={{fontSize:'17px'}}>{review.text}</span><br/>
                            {moment(review.time).fromNow()}
                         </div>
                          <div className="col-xs-2">
                                  
                         </div>
                      </div>
                        <div className="line-seperator"></div>
                  </div>
        );
    }
});

module.exports = Review;
