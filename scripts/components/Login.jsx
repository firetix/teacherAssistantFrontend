
var Reflux = require('Reflux');
var React = require('react');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('../components/common/ErrorNotice.react.jsx');
var Actions = require('../actions/Actions');
var Router = require('react-router');
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
    return { errors: [],email:'',password:'' };
  },
  onSubmit:function(e){
    e.preventDefault();

    React.findDOMNode(this.refs.login).disabled = true;
    this.setState({
        submitted: true
    });

    Actions.login({
        email: this.state.email.trim(),
        password: this.state.password.trim()
    });
  },
  userUpdate:function(triggerName,errors,user){
    switch (triggerName) {
      case 'loginSuccess':
     this.transitionTo('entries',{
       pageNum:1
     });
        break;
        case 'loginError':
          React.findDOMNode(this.refs.login).disabled = false;
        this.setState({
            user: user,
            errors:errors
        });
          break;
    }
  },
  render: function() {
    var errors = this.state.errors.length?(<div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" style={{marginRight:'5px',marginLeft:'5px'}} aria-hidden="true"></span>
          <span className="sr-only">Error:</span>
        {this.state.errors}
      </div>):(<div></div>)
    return (
      <div>
      <Paper zDepth={2} className="text-center" style={{overflow:'hidden'}}>
      <div className="container">
         <br/>
        {errors}
        </div>
      <form role="form" onSubmit={this.onSubmit }>
        <div className="form-group">
         <TextField
         valueLink={this.linkState("email")}
           floatingLabelText="Email" type="email">
         </TextField>
        </div>
        <div className="form-group">
         <TextField
         valueLink={this.linkState("password")}
           floatingLabelText="Password" type="password">
         </TextField>
        </div>
          <br/>
        <div className="text-right">
        <RaisedButton label="Login" style={{width:'100%'}} secondary={true} ref="login" type="submit"/>
        </div>
      </form>
      </Paper>
    </div>
    );
  }
});
module.exports = LoginPage;
