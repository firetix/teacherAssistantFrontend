// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;

var Tripp = React.createClass({
    render:function() {
        return (
            <div className="post">
                one tripp
              </div>
        );
    }
});

module.exports = Tripp;


// // actions
// var Actions = require('../actions/Actions');
// // components
// var Link = require('react-router').Link;
// var Upvote = require('./Upvote');

// // var abbreviateNumber = require('../util/abbreviateNumber');
// // var pluralize = require('../util/pluralize');
// // var hostNameFromUrl = require('../util/hostNameFromUrl');
// // var timeAgo = require('../util/timeAgo');

// var Post = React.createClass({

//     propTypes: {
//         user: React.PropTypes.object,
//         post: React.PropTypes.object
//     },

//     render() {
//         var user = this.props.user;
//         var post = this.props.post;
//         var commentCount = post.commentCount || 0;
//         var deleteOption = '';

//         if (post.isDeleted) {
//             // post doesn't exist
//             return (
//                 <div className="post cf">
//                     <div className="post-link">
//                         [deleted]
//                     </div>
//                 </div>
//             );
//         }

//         // add delete option if creator is logged in
//         if (user.uid === post.creatorUID) {
//             deleteOption = (
//                 <span className="delete post-info-item">
//                     <a onClick={ Actions.deletePost.bind(this, post.id) }>delete</a>
//                 </span>
//             );
//         }

//         var upvoteActions = {
//             upvote: Actions.upvotePost,
//             downvote: Actions.downvotePost
//         };

//         return (
//             <div className="post">
//                 <div className="post-link">
//                     <a className="post-title" href={ post.url }>{ post.title }</a>
//                     <span className="hostname">
//                         (<a href={ post.url }>{ hostNameFromUrl(post.url) }</a>)
//                     </span>
//                 </div>
//                 <div className="post-info">
//                     <div className="posted-by">
//                         <Upvote
//                             upvoteActions= { upvoteActions }
//                             user={ user }
//                             itemId={ post.id }
//                             upvotes={ post.upvotes ? abbreviateNumber(post.upvotes) : 0 } />
//                         <span className="post-info-item">
//                             <Link to="profile" params={{ username: post.creator }}>{ post.creator }</Link>
//                         </span>
//                         <span className="post-info-item">
//                             { timeAgo(post.time) }
//                         </span>
//                         <span className="post-info-item">
//                             <Link to="post" params={{ postId: post.id }}>
//                                 { pluralize(commentCount, 'comment') }
//                             </Link>
//                         </span>
//                         { deleteOption }
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// });

// module.exports = Post;
