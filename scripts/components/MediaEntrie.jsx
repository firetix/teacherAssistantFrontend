// actions
var Actions = require('../actions/Actions');
var moment = require('moment');
// components
var Link = require('react-router').Link;

var MediaEntrie = React.createClass({
    render:function() {
    	var media = this.props.media;
    	var entrie = this.props.entrie;
    	var row;
    	if(media.type =="note"){
    		row = (<div className="row text-center">
    			<div className="col-xs-4">
    				<img id="detail-icon-img" src="https://cdn2.iconfinder.com/data/icons/facebook-svg-icons-1/64/note-128.png" alt="note, paper icon" width="70" height="70"></img>
    			</div>
    			<div className="col-xs-8">
    				   <p>{media.text}</p>
    				   <p>{moment(entrie.time).fromNow()}</p>
    			</div>
                		
          	</div>)
    	}else if(media.type == "photo"){
                    row = (<div className="row text-center">
                        <div className="col-xs-4">
                            <img id="detail-icon-img" src={media.photo_url} alt="note, paper icon" width="70" height="70"></img>
                        </div>
                        <div className="col-xs-8">
                               <p>{media.caption}</p>
                               <p>{moment(entrie.time).fromNow()}</p>
                        </div>
                                
                    </div>)
        }else if(media.type = "how_high"){
            row = (<div className="row text-center">
                <div className="col-xs-4">
                    <img id="detail-icon-img" src="https://cdn2.iconfinder.com/data/icons/nasty/60/hippie_weed_marijuana-128.png" alt="hippie, marijuana, weed icon" width="128" height="128"></img>
                </div>
                <div className="col-xs-8">
                       <p><b>{media.text}</b>/10</p>
                       <p>{media.comment}</p>
                       <p>{moment(entrie.time).fromNow()}</p>
                </div>
                        
            </div>)
        }
        return (
            <div className="row">
                {row}
                <div className="line-seperator"></div>
          	</div>
        );
    }
});

module.exports = MediaEntrie;
