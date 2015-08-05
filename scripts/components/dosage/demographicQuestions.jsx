var Reflux = require('Reflux');
var React = require('react');
// actions
var Actions = require('../../actions/Actions');
var Qty = require('js-quantities')
// components
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton= mui.RaisedButton,
  TextField = mui.TextField;
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
            height: Qty(React.findDOMNode(this.refs.height).value.trim()).to('m'),
            weight: Qty(React.findDOMNode(this.refs.weight).value.trim()).to('kg'),
            gender: React.findDOMNode(this.refs.gender).value.trim(),
            experience_level: React.findDOMNode(this.refs.experience).value.trim()
        });
  },
    userUpdate: function(triggerName, errors, user) {
        switch (triggerName) {
            case 'accountUpdateSuccess':
                  Actions.hideModel();
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
                  <div className='container sp_main_content'>
     <TextField
     valueLink={this.linkState("height")}
       hintText="Height"
       defaultValue="0"
       floatingLabelText="Height" />
     <TextField
     valueLink={this.linkState("weight")}
       hintText="Weight"
       defaultValue="0"
       floatingLabelText="Weight" />
     <TextField
     valueLink={this.linkState("full_name")}
       hintText="Full Name"
       defaultValue="Default Value"
       floatingLabelText="Full Name" />
       <p>birthdate</p>
       <DatePicker  defaultDate={new Date(this.state.birthdate)} onChange= {this.onChange} hintText="birthdate"/>
     <TextField
     valueLink={this.linkState("gender")}
       hintText="gender"
       defaultValue="Default Value"
       floatingLabelText="gender" />
       <TextField
       valueLink={this.linkState("experience_level")}
         hintText="experience_level"
         defaultValue="Default Value"
         floatingLabelText="experience_level" />
        <RaisedButton label="Submit" secondary={true} ref="submit" onClick={this.onSubmit}/>
      </div>
        );
    }
});

module.exports = DemographicQuestions;
