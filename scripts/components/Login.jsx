
var Reflux = require('reflux');
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
    return { errors: [],email:'',password:'',is_student:false };
  },
  onSubmit:function(e){
    e.preventDefault();

    React.findDOMNode(this.refs.login).disabled = true;
    this.setState({
        submitted: true
    });

    Actions.login({
        email: this.state.email.trim(),
        password: this.state.password.trim(),
        is_student:this.state.is_student
    });
  },
  userUpdate:function(triggerName,errors,user){
    switch (triggerName) {
      case 'loginSuccess':
        if (this.state.is_student) {
          this.transitionTo('studentsPage',{
            pageNum:1
          });
        }else{
          this.transitionTo('teachersPage',{
            pageNum:1
          });
        }
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
    var formStyle = {
        width: 380
    };
    var errors = this.state.errors.length?(<div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" style={{marginRight:'5px',marginLeft:'5px'}} aria-hidden="true"></span>
          <span className="sr-only">Error:</span>
        {this.state.errors}
      </div>):(<div></div>)
    return (
      <div>
      
      <div className="container">
         <br/>
        {errors}
        </div>
      <div className="form">
        <div className="row">
          <form className="col s8 offset-s2 card"  onSubmit={this.onSubmit }>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="first_name">Email</label>
                <input placeholder="Email" id="first_name"   valueLink={this.linkState("email")} type="text" className="validate"></input>
                </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="Password" id="password"   valueLink={this.linkState("password")} type="password" className="validate"></input>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="input-field col s6 offset-s3">
              <select className="browser-default" valueLink={this.linkState('is_student')}>
                <option value="" disabled selected>I am a...</option>
                <option value="false">Student</option>
                <option value="true">Teacher</option>
              </select>
            </div>
            <div className="text-right">
            <RaisedButton label="Login" style={{width:'105%',height:'64px',marginTop:'20px', marginLeft:'-2.5%', color:'#039be5'}} secondary={true} ref="login" type="submit"/>
            </div>
          </form>
        </div>


      </div>


    </div>
    );
  }
});
module.exports = LoginPage;
