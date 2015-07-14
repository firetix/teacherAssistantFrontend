var Reflux = require('reflux');
// actions
var Actions = require('../../actions/Actions');
var moment = require('moment');
// components
var Link = require('react-router').Link;

var Tripp = React.createClass({


    render:function() {
        var user = this.props.user;
        var tripp = this.props.tripp;
        var test;
        var time = ( <p>{moment(tripp.time).fromNow()}</p>    );
        if(!tripp.end_time){
            test= (<p>in progress</p>)
        }else{
            time = (<p>started < b >  {moment(tripp.time).calendar()} </ b>
                      ended < b>  {moment(tripp.end_time).calendar()} < /b></p>)
        }
        console.log(tripp)
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">
                        <img id="detail-icon-img" src="https://cdn2.iconfinder.com/data/icons/stilllife/48x48/apps/dopewars-weed.png" alt="dopewars, drugs, weed icon" width="48" height="48"></img>
                    </div>
                    <div className="col-xs-6">
                        <p>        <Link className="post-title" to="tripp" params={{ trippId: tripp.id }}>
                    {tripp.title}
                </Link></p> 
                        <p>create by <b> {tripp.creatorName}</b></p>          
                            {time}   
                    </div>
                    <div className="col-xs-2">
                      {test}
                    </div>
                </div>
                    <div className="line-seperator"></div>     
                </div>
        );
    }
});

module.exports = Tripp;
