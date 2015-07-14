
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

    Actions.login({
        email: React.findDOMNode(this.refs.email).value.trim(),
        password: React.findDOMNode(this.refs.password).value.trim()
    });
  },
  userUpdate:function(triggerName,errors,user){
    switch (triggerName) {
      case 'loginSuccess':
     this.transitionTo('tripps',{
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
        {errors}
      <form role="form" onSubmit={this.onSubmit }>
        <div className="form-group">
          <label className="control-label" htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"  ref="email" />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref="password"/>
        </div>
        <button type="submit" className="btn btn-primary" ref="submit">Submit</button>
      </form>
    </div>
    );
  }
});
module.exports = LoginPage;
