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
                       <div className="navbar-fixed"><nav className="deep-orange" role="navigation">
    <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="/">Login</a></li>
      </ul>

      <ul id="nav-mobile" className="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
  </div>
                <div className="image-container">
    <div className="title">
      <h1><strong>Our Mission:</strong></h1>
      <h5>to provide the teachers with the tools to help their students reach their full potential.</h5>
    </div>
      <Login/>
    
  </div>
      
            </div>
        );
    }
});

module.exports = Home;
