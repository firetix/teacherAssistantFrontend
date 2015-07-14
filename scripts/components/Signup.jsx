var Reflux = require('Reflux');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('../components/common/ErrorNotice.react.jsx');
var Actions = require('../actions/Actions');
var Router = require('react-router');

var LoginPage = React.createClass({
  mixins: [
        Router.Navigation,
      Reflux.listenTo(SessionStore, 'userUpdate')
  ],
  getInitialState: function() {
    return { errors: [] };
  },
  onSubmit:function(e){
    e.preventDefault();

    React.findDOMNode(this.refs.submit).disabled = true;
    this.setState({
        submitted: true
    });

        Actions.register({
            email: React.findDOMNode(this.refs.email).value.trim(),
            full_name: React.findDOMNode(this.refs.full_name).value.trim(),
            password: React.findDOMNode(this.refs.password).value.trim(),
            password_confirmation: React.findDOMNode(this.refs.password_confirmation).value.trim()
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
        {errors}
      <form role="form" onSubmit={this.onSubmit }>
        <div className="form-group">
          <label className="control-label" htmlFor="InputEmail1">Email address</label>
          <input type="email" className="form-control" id="InputEmail1" placeholder="Enter email"  ref="email" />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputFullName">Full Name</label>
          <input className="form-control" id="InputFullName" placeholder="Enter full name"  ref="full_name" />
        </div>
        
        <div className="form-group">
          <label className="control-label" htmlFor="InputPassword">Password</label>
          <input type="password" className="form-control" id="InputPassword" placeholder="Password" ref="password"/>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputPasswordConfirmation">Password</label>
          <input type="password" className="form-control" id="InputPasswordConfirmation" placeholder="Password confirmation" ref="password_confirmation"/>
        </div>
        <button type="submit" className="btn btn-primary" ref="submit">Submit</button>
      </form>
    </div>
    );
  }
});
module.exports = LoginPage;
