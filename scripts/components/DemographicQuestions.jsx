var Reflux = require('Reflux');
// actions
var Actions = require('../actions/Actions');
var Qty = require('js-quantities')
var React = require('react');
// components

var Router = require('react-router');
var moment = require('moment');

var Link = Router.Link;
var SessionStore = require('../stores/SessionStore.react.jsx');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  DatePicker= mui.DatePicker,
  RaisedButton= mui.RaisedButton,
  AppBar= mui.AppBar,
  Paper= mui.Paper,
  TextField = mui.TextField;

var DemographicQuestions = React.createClass({
    mixins: [
        Router.Navigation,
        React.addons.LinkedStateMixin,
        Reflux.listenTo(SessionStore, 'userUpdate')
    ],
 getInitialState: function () {
     return this.props.user
 },
    onSubmit: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.next).disabled = true;
        Actions.updateAccount({
            birthdate: this.state.birthdate.trim(),
            height: this.state.height.trim(),
            weight: this.state.weight.trim(),
            gender: this.state.gender.trim(),
            experience_level: this.state.experience_level.trim()
        });
  },
    userUpdate: function(triggerName, errors, user) {
        switch (triggerName) {
            case 'accountUpdateSuccess':
                Actions.showRecurrentQuestions();           
                break;
            case 'accountUpdateError':
                React.findDOMNode(this.refs.next).disabled = false;
                this.setState({
                    user: user,
                    errors: errors
                });
                break;
        }
    },
    onChange: function(obj, date) {
        this.setState({
            birthdate: moment(date).format("MM/DD/YYYY")
        });
    },
    onChangeBirthday: function(obj, date) {
        this.setState({
            birthdate: moment(React.findDOMNode(obj.currentTarget).value).format("MM/DD/YYYY")
        });

    },
    onRightIconButtonClick:function(){
      Actions.goBackDosage();
    },
    render:function() {

        return (
          <div>
          <mui.AppBar
              title='Spoonfull'
              onLeftIconButtonTouchTap={this.onRightIconButtonClick}
               iconClassNameLeft="fa fa-chevron-left"    />
            <div className='container' style={{marginTop:10}}>
            <Paper zDepth={2} className="text-center">
               
                <TextField
                valueLink={this.linkState("height")}
                  hintText="Height"
                  defaultValue="meters"
                  floatingLabelText="Height" />
                <TextField
                valueLink={this.linkState("weight")}
                  hintText="Weight"
                  defaultValue="kilogrames"
                  floatingLabelText="Weight" />
                <TextField
                 value={moment(this.state.birthdate).format("YYYY-MM-DD")}
                  hintText="Birthdate"
                  defaultValue="Default Value"
                  floatingLabelText="Birthdate"
                  type="date"
                     onChange={this.onChangeBirthday}/>
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
                    <div className="row container" style={{marginTop:10}}>
                   <RaisedButton style={{width:'100%'}} label="Next" secondary={true} ref="next" onClick={this.onSubmit}/>
                 </div>
                 <br/>
                   </Paper>

                 </div>
                 </div>
        );
    }
});

module.exports = DemographicQuestions;
