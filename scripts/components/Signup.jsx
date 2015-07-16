var Reflux = require('Reflux');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('../components/common/ErrorNotice.react.jsx');
var Actions = require('../actions/Actions');
var Router = require('react-router');
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
    return { errors: [],email:'',password:'',full_name:'',password_confirmation:'' };
  },
  onSubmit:function(e){
    e.preventDefault();

    React.findDOMNode(this.refs.submit).disabled = true;
    this.setState({
        submitted: true
    });
    if(this.state.invite_code != "puppy"){
      this.setState({
        errors:['Invite code incorrect']
      })
      return
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
	     this.transitionTo('tripps',{
	       pageNum:1
	     });
        break;
        case 'registerError':
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
            floatingLabelText="Email">
          </TextField>
        </div>
        <div className="form-group">
          <TextField
          valueLink={this.linkState("full_name")}
            floatingLabelText="Full Name">
          </TextField>
        </div>
        
        <div className="form-group">
          <TextField
          valueLink={this.linkState("password")}
            floatingLabelText="Password">
          </TextField>
        </div>
        <div className="form-group">
          <TextField
          valueLink={this.linkState("password_confirmation")}
            floatingLabelText="Password confirmation">
          </TextField>
        </div>
        <div className="form-group">
          <TextField
          valueLink={this.linkState("invite_code")}
            floatingLabelText="Invite code">
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
