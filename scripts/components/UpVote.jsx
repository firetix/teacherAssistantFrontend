'use strict';

var Actions = require('../actions/Actions');
var throttle = require('underscore').throttle;

var cx = require('classnames');

var Upvote = React.createClass({


    getInitialState:function() {
        return {
            upvoted: false
        };
    },

    // componentDidMount() {
    //     var upvoted = this.props.user.profile.upvoted;
    //     this.setState({
    //         upvoted: upvoted[this.props.itemId]
    //     });
    // },

    componentWillReceiveProps:function(nextProps) {
        // var upvoted = nextProps.user.profile.upvoted;
        // this.setState({
        //     upvoted: upvoted[nextProps.itemId]
        // });
    },

    upvote: throttle(function(userId, itemId) {
        // if (!this.props.user.isLoggedIn) {
        //     Actions.showModal('login');
        //     return;
        // }

        // var upvoted = this.state.upvoted;
        // var upvoteActions = this.props.upvoteActions;

        // if (upvoted) {
        //     upvoteActions.downvote(userId, itemId);
        // } else {
        //     upvoteActions.upvote(userId, itemId);
        // }

        // this.setState({
        //     upvoted: !upvoted
        // });
    }, 300, { trailing: false }),

    render:function() {
        // var userId = this.props.user.uid;
        // var itemId = this.props.itemId;
        // var upvotes = this.props.upvotes;

        var upvoted = this.state.upvoted;
        var upvoteCx = cx(
            'upvote', {
            'upvoted': upvoted
        });

        return (
            <a>
                { 2 } <i className="fa fa-arrow-up"></i>
            </a>
        );
    }

});

module.exports = Upvote;
