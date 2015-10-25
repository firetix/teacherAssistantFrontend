// actions
var Actions = require('../actions/Actions');
var moment = require('moment');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  List= mui.List,
  TextField = mui.TextField,
  ContentInbox = mui.ContentInbox,
  IconButton = mui.IconButton,
  ListItem = mui.ListItem;

var Media = React.createClass({
    render:function() {
    	var media = this.props.media;
    	var entrie = this.props.entrie;
    	var row;
    	if(media.type =="note"){
    		row = (
            <List>
               <ListItem primaryText={media.text} secondaryText={moment(media.time).fromNow()} leftIcon={(<IconButton iconClassName="fa fa-pencil-square-o"/>)} />
             </List>)
    	}else if(media.type == "photo"){
                    row = (
                    <div className="row text-center" style={{backgroundColor:'white'}}>
                                            <div className="col-xs-1">
                                             <div style={{position:'relative',minHeight:'50px'}}>
                                               <span className="fa fa-camera fa-3x" style={{color:'black',top:'25px',bottom:'0',position:'absolute'}}></span>
                                             </div>
                                            </div>
                                            <div className="col-xs-8">
                                              <img id="detail-icon-img" src={media.photo_url} alt="note, paper icon" width="95" height="95"></img>
                                                   <p  className="media_time">{moment(entrie.time).fromNow()}</p>
                                            </div>
                                                    
                                        </div>)
        }else if(media.type == "how_high"){
            row = (<div className="row text-center" style={{backgroundColor:'white'}}>
                <div className="col-xs-4">
                    <img id="detail-icon-img" src="https://cdn2.iconfinder.com/data/icons/nasty/60/hippie_weed_marijuana-128.png" alt="hippie, marijuana, weed icon" width="128" height="128"></img>
                </div>
                <div className="col-xs-8">
                       <p><b>{media.text}</b>/10</p>
                       <p>{media.comment}</p>
                       <p className="media_time">{moment(entrie.time).fromNow()}</p>
                </div>
                        
            </div>)
        }else if(media.type == "dose"){
            row = (<List>
               <ListItem primaryText={media.quantity + " " + media.unit_of_mesure} secondaryText={moment(media.time).fromNow()} leftIcon={(<IconButton iconClassName="fa fa-spoon"/>)} />
             </List>)
          }else if(media.type == "sensation"){
            row = (
             <div className="row text-center" style={{backgroundColor:'white'}}>
                                     <div className="col-xs-1">
                                      <div style={{position:'relative',minHeight:'50px'}}>
                                        <span className="fa fa-tachometer fa-3x" style={{color:'black',top:'25px',bottom:'0',position:'absolute'}}></span>
                                      </div>
                                     </div>
                                     <div className="col-xs-8">
                                       <div className="smiley text-center" >
                                        <div className={media.sensation} ref="selected_sensation" style={{'borderColor':media.intensityColor}}></div>
                                      </div>
                                            <p  className="media_time">{moment(entrie.time).fromNow()}</p>
                                     </div>
                                             
                                 </div>


             )
        }
        return (
            <div >
                {row}
                <div className="line-seperator"></div>
          	</div>
        );
    }
});

module.exports = Media;
