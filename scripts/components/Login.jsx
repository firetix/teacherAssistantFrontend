
var Reflux = require('reflux');
var React = require('react');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('../components/common/ErrorNotice.react.jsx');
var Actions = require('../actions/Actions');
var Router = require('react-router');
var injectTapEventPlugin = require("react-tap-event-plugin");
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton= mui.RaisedButton,
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

    React.findDOMNode(this.refs.submit).disabled = true;
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
          React.findDOMNode(this.refs.submit).disabled = false;
        this.setState({
            user: user,
            errors:errors
        });
          break;
    }
  },
  render: function() {
    var errors = this.state.errors.length?(<div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Error:</span>
        {this.state.errors}
      </div>):(<div></div>)
    return (
      <div>
            <br/>
      <br/>
        {errors}
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
        <div className="text-right">
        <RaisedButton label="Submit" secondary={true} ref="submit" onClick={this.onSubmit}/>
        </div>
      </form>
    </div>
    );
  }
});
module.exports = LoginPage;
