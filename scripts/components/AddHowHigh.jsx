var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;
var Slider = require("bootstrap-slider");

var AddHowHigh = React.createClass({

    onSubmit:function(e){
        e.preventDefault();

        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        var mediaTextEl = this.refs.mediaTextEl.getDOMNode();

        var media = {
            trippId: this.props.params.trippId,
            trippTitle: this.props.tripp.title,
            comment: mediaTextEl.value.trim(),
            text: this.sliderHowHigh.getValue(),
            type:"how_high",
            creator: this.props.user.full_name,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addMedia(media);
        mediaTextEl.value = '';
        Actions.hideModal();
    },
        componentDidMount: function() {
        this.sliderHowHigh = new Slider("#ex19", {
            ticks: [ 1, 2,3,4,5,6,7,8,9,10],
            ticks_labels: ['1','2','3','4','5','6','7','8','9','10'],
            value:1
        });

    },
    render:function() {
        return (
            <form role="form" onSubmit={this.onSubmit }>
               <div className="form-group">
                 <label className="control-label" htmlFor="InputAge">How high are you?</label>
               </div>
                 <input id="ex19" type="text"/>
               <div className="form-group">
                 <label className="control-label" htmlFor="InputHeight">Comments</label>
               </div>
                <textarea placeholder="Add a note" ref="mediaTextEl" className="comment-input full-width"></textarea>
               <button type="submit" className="btn" ref="submit">Submit</button>
            </form>
        );
    }
});

module.exports = AddHowHigh;
