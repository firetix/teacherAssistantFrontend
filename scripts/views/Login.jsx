// components
var Actions = require('../actions/Actions');
var Link = require('react-router').Link;
var Login = require('../components/Login.jsx');
var Router = require('react-router');

var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  Page = mui.Page,
  Dialog = mui.Dialog;
var LoginView = React.createClass({
	mixins: [
	    Router.Navigation
	],
	componentWillMount: function () {
	    if(this.props.user && this.props.user.signedIn){
	    	this.transitionTo('entries',{
	    		pageNum:1
	    	});
	    } 
	},
	onLeftIconButtonTouchTap:function(){
		Actions.showLeftNav();
		// this.refs.leftNav.toggle();
	},
    render:function() {
    	var navBar;
    	var menu;
        return (

            <div>

                            
            		<div className="container sp_main_content ">
                  <Login/>
            	</div>	
            </div>
        );
    }
});

module.exports = LoginView;
