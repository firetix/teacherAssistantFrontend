var Reflux = require('Reflux');
// actions
var Actions = require('../actions/Actions');
var Qty = require('js-quantities')
// components

var Router = require('react-router');

var Link = Router.Link;
var SessionStore = require('../stores/SessionStore.react.jsx');

var DemographicQuestions = React.createClass({
    mixins: [
        Router.Navigation,
        Reflux.listenTo(SessionStore, 'userUpdate')
    ],
    onSubmit: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.submit).disabled = true;
        Actions.updateAccount({
            birthdate: React.findDOMNode(this.refs.age).value.trim(),
            height: React.findDOMNode(this.refs.height).value.trim(),
            weight: React.findDOMNode(this.refs.weight).value.trim(),
            gender: React.findDOMNode(this.refs.gender).value.trim(),
            experience_level: React.findDOMNode(this.refs.experience).value.trim()
        });
  },
    userUpdate: function(triggerName, errors, user) {
        switch (triggerName) {
            case 'accountUpdateSuccess':
                Actions.showModal('recurrentQuestions');                    
                break;
            case 'accountUpdateError':
                React.findDOMNode(this.refs.submit).disabled = false;
                this.setState({
                    user: user,
                    errors: errors
                });
                break;
        }
    },
    render:function() {

        return (
                  <form role="form" onSubmit={this.onSubmit }>
        <div className="form-group">
          <label className="control-label" htmlFor="InputAge">Age</label>
          <input  className="form-control" id="InputAge" placeholder="mm/dd/yyyy"  ref="age" />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputHeight">Height</label>
          <input  className="form-control" id="InputFullName" placeholder="Height"  ref="height" />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputWeight">Weight</label>
          <input className="form-control" id="InputWeight" placeholder="Weight" ref="weight"/>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputGender">Gender</label>
          <input className="form-control" id="InputGender" placeholder="m/f" ref="gender"/>
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="InputExperiance">Experience level with marijuana edibles</label>
          <input className="form-control" id="InputExperiance" placeholder="1 to 5" ref="experience"/>
        </div>
        <button type="submit" className="btn" ref="submit">Submit</button>
      </form>
        );
    }
});

module.exports = DemographicQuestions;
