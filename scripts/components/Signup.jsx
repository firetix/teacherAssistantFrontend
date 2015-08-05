var Reflux = require('Reflux');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('../components/common/ErrorNotice.react.jsx');
var Actions = require('../actions/Actions');
var Router = require('react-router');
var _ = require('underscore');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton= mui.RaisedButton,
  Paper= mui.Paper,
  TextField = mui.TextField;

var LoginPage = React.createClass({
  mixins: [
        Router.Navigation,
        React.addons.LinkedStateMixin,
      Reflux.listenTo(SessionStore, 'userUpdate')
  ],
  getInitialState: function() {
        return {
            errors: [],
            email: '',
            password: '',
            full_name: '',
            password_confirmation: '',
            email_error:'',
            password_error:'',
            invite_code_error:''
        };
  },
  componentWillMount: function () {
      if(this.props.user && this.props.user.signedIn){
        this.transitionTo('entries',{
          pageNum:1
        });
      } 
  },
  onSubmit:function(e){
    e.preventDefault();
    this.setState({
      errors:[]
    });
    React.findDOMNode(this.refs.submit).disabled = true;
    this.setState({
        submitted: true
    });
    if(this.state.invite_code != "420"){
      this.setState({
        invite_code_error:'Invite code incorrect'
      });
      React.findDOMNode(this.refs.submit).disabled = false;
      return
    }else{
    	this.setState({
    	  invite_code_error:''
    	});
    } 

    if(this.state.password.trim() != this.state.password_confirmation.trim()){
      this.setState({
        password_error:'Password confirmation must match Password'
      });
      React.findDOMNode(this.refs.submit).disabled = false;
      return
    }else{
    	this.setState({
    	  password_error:''
    	});
    }
        Actions.register({
            email: this.state.email.trim(),
            full_name: this.state.full_name.trim(),
            password: this.state.password.trim(),
            password_confirmation: this.state.password_confirmation.trim()
        });
  },
  userUpdate:function(triggerName,errors,user){
    switch (triggerName) {
      case 'registerSuccess':
	     this.transitionTo('entries',{
	       pageNum:1
	     });
        break;
        case 'registerError':
        	var obj = {};
          React.findDOMNode(this.refs.submit).disabled = false;
          _.each(errors,function(value, key, list){
          	obj[key+"_error"] = value[0];
          });
          obj.user = user;
        this.setState(obj);
          break;
    }
  },
  onLeftIconButtonTouchTap:function(){
    Actions.showLeftNav();
    // this.refs.leftNav.toggle();
  },
  render: function() {
    var errors = this.state.errors.length?(<div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" style={{marginRight:'5px',marginLeft:'5px'}} aria-hidden="true"></span>
          <span className="sr-only">Error:</span>
        {this.state.errors}
      </div>):(<div></div>)
    return (
      <div>
      <mui.AppBar
                       title='Spoonfull'
                        onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} className="app_bar" />
                          <div className="container sp_main_content">
        <Paper zDepth={2} className="text-center" style={{overflow:'hidden'}}>      
        <form role="form" onSubmit={this.onSubmit }>
          <TextField
          valueLink={this.linkState("email")}
           errorText={this.state.email_error}
            floatingLabelText="Email" type="email" required={true}>
          </TextField><br/>
        
          <TextField
          valueLink={this.linkState("full_name")}
            floatingLabelText="Full Name" required={true}>
          </TextField><br/>
        
        
          <TextField
          valueLink={this.linkState("password")}
            floatingLabelText="Password"
            errorText={this.state.password_error}
            type="password" required={true}>
          </TextField><br/>
        
          <TextField
          valueLink={this.linkState("password_confirmation")}
          errorText={this.state.password_error}
            floatingLabelText="Password confirmation"
            type="password" required={true}>
          </TextField><br/>
        
          <TextField
          valueLink={this.linkState("invite_code")}
          errorText={this.state.invite_code_error}
            floatingLabelText="Invite code" required={true} type="text" pattern="\d*">
          </TextField>
        <br/>
         <br/>
          <br/>
        <div className="text-right">
        <RaisedButton label="Signup" style={{width:'100%'}}secondary={true} ref="submit" type="submit"/>
        </div>
        </form>
      </Paper>
    </div>
    </div>
    );
  }
});
module.exports = LoginPage;
