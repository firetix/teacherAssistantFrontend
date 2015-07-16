// components
var Link = require('react-router').Link;
var Router = require('react-router');
var Home = React.createClass({
	mixins: [
	    Router.Navigation
	],
	componentWillMount: function () {
	    if(this.props.user.signedIn){
	    	this.transitionTo('entries',{
	    		pageNum:1
	    	});
	    } 
	},
    render:function() {
        return (
            <div className="content full-width">
                <p>Welcome to spoonfull</p>
                
            </div>
        );
    }
});

module.exports = Home;
