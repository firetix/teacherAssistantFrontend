// components
var Actions = require('../actions/Actions');
var Link = require('react-router').Link;
var Router = require('react-router');
var Login = require('./Login.jsx');

var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  FlatButton = mui.FlatButton,
  Paper = mui.Paper,
  RaisedButton = mui.RaisedButton,
  Dialog = mui.Dialog;
  var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Home = React.createClass({
	mixins: [
	    Router.Navigation,
      LoginRedirection
	],
	componentWillMount: function () {
	    if(this.props.user.signedIn){
	    	this.transitionTo('produts',{
	    		pageNum:1
	    	});
	    } 
	},
	onLeftIconButtonTouchTap:function(){
		Actions.showLeftNav();
		// this.refs.leftNav.toggle();
	},
  onLogin:function(){
    this.transitionTo('login');
  },
  onSignup:function(){
    this.transitionTo('signup');
  },
    render:function() {
    	var navBar;
    	var menu;
        return (

            <div>
                        <div className="navbar-fixed">
    <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Chestnut</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="waves-effect waves-light"><a >Sign In</a></li>
      </ul>
    </div>
  </nav>
  </div>
                <div className="image-container">
    <div className="title">
      <h2><strong>Dynamic. Helpful. Chestnut.</strong></h2>
      <h5>Introducing a new way for students to reach their full potential from teachers using the resources and awesomeness of Chestnut.</h5>
    </div>
      <Login/>
    
  </div>
      
            </div>
        );
    }
});

module.exports = Home;
