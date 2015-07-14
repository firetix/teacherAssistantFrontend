var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;

var AddNote = React.createClass({

    addNote:function(e){
        e.preventDefault();

        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        var mediaTextEl = this.refs.mediaTextEl.getDOMNode();

        var media = {
            trippId: this.props.params.trippId,
            trippTitle: this.props.tripp.title,
            text: mediaTextEl.value.trim(),
            type:"note",
            creator: this.props.user.full_name,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addMedia(media);
        mediaTextEl.value = '';
        Actions.hideModal();
    },
    render:function() {
        return (
                 <form className='comment-form' onSubmit={ this.addNote }>
                    <textarea placeholder="Add a note" ref="mediaTextEl" className="comment-input full-width"></textarea>
                    <button type="submit" className="button button-primary">Submit</button>
                </form>
        );
    }
});

module.exports = AddNote;
