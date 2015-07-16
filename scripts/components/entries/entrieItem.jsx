var Reflux = require('reflux');
// actions
var Actions = require('../../actions/Actions');
var moment = require('moment');
// components
var Link = require('react-router').Link;

var Entrie = React.createClass({


    render:function() {
        var user = this.props.user;
        var entrie = this.props.entrie;
        var test;
        var time = ( <p>{moment(entrie.time).fromNow()}</p>    );
        if(!entrie.end_time){
            test= (<p>in progress</p>)
        }else{
            time = (<p>started < b >  {moment(entrie.time).calendar()} </ b>
                      ended < b>  {moment(entrie.end_time).calendar()} < /b></p>)
        }
        console.log(entrie)
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">
                        <img id="detail-icon-img" src="https://cdn2.iconfinder.com/data/icons/stilllife/48x48/apps/dopewars-weed.png" alt="dopewars, drugs, weed icon" width="48" height="48"></img>
                    </div>
                    <div className="col-xs-6">
                        <p>        <Link className="post-title" to="entrie" params={{ entrieId: entrie.id }}>
                    {entrie.title}
                </Link></p> 
                        <p>create by <b> {entrie.creatorName}</b></p>          
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

module.exports = Entrie;
