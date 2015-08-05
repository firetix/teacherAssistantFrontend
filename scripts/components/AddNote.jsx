var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;

var AddNote = React.createClass({
    mixins: [
        Reflux.listenTo(Actions.addNoteUI, 'addNoteUI')
    ],
    addNoteUI:function(e){
        // e.preventDefault();
        var entrie = this.props.entrie;
        var mediaTextEl = this.refs.mediaTextEl.getDOMNode();

        var media = {
            entrieId: entrie.id,
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
                 <form className='comment-form' >
                    <textarea placeholder="Add a note" ref="mediaTextEl" className="comment-input full-width"></textarea>
                </form>
        );
    }
});

module.exports = AddNote;
