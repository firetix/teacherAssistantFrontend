// components
var Actions = require('../actions/Actions');
var Link = require('react-router').Link;
var Router = require('react-router');

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
	    	this.transitionTo('entries',{
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
    	if (this.props.user && this.props.user.signedIn) {
    		this.transitionTo('entries',{
    			pageNum:1
    		});
    	}else{
    			menu=(    <mui.AppBar
                  title='Spoonfull'
                   onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} className="app_bar" />
                  )
    		}
        return (

            <div>
            {menu}
            		<div className="container sp_main_content">
                <Paper zDepth={2} className="text-center">
                <div className="container">
                  <h5>Welcom to spoonfull</h5>
                  <h6> this app works best if you add it to your homescreen</h6>
                  <div className="row" style={{marginTop:10}}>
                     <RaisedButton style={{width:'50%'}} label="Login" secondary={true} ref="Login" onClick={this.onLogin}/>
                     <RaisedButton style={{width:'50%'}} label="Signup" secondary={true} ref="Signup" onClick={this.onSignup}/>
                   </div>
            	</div>	
                </Paper>
              </div>  
            </div>
        );
    }
});

module.exports = Home;
