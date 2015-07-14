// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;

var Timer = React.createClass({
	componentDidMount: function () {
	      debugger;
	},
    render:function() {
        return (
         < div className = "col-md-12 text-center" >< h1 className = "text-center" > 00: 00 < /h1>
        	            <button className="btn btn-circle btn-primary btn-xl " disabled>Start</button >
        	< /div>
        );
    }
});

module.exports = Timer;
