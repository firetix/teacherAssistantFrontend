var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var React = require('react');
// components

var Router = require('react-router');
var Slider = require("bootstrap-slider");
var Link = Router.Link;
var DosageStore = require('../stores/dosageStore.jsx');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  DatePicker= mui.DatePicker,
  RaisedButton= mui.RaisedButton,
  AppBar= mui.AppBar,
  Paper= mui.Paper,
  Toggle= mui.Toggle,
  TextField = mui.TextField;

var RecurrentQuestions = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State,
        React.addons.LinkedStateMixin,
        Reflux.listenTo(DosageStore, 'dosageUpdate')
    ],
    getInitialState: function () {
        return {
            alcohol:false,
            sport:false,
            eaten:false
        }
    },
    onSubmit: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.next).disabled = true;
        Actions.createRecommendation({
            recommendation: {
                alcohol: this.state.alcohol,
                sport: this.state.sport,
                eaten: this.state.eaten,
                user_id:this.props.user.id
            }
        });
  },
    dosageUpdate: function(params, recommendation) {
        Actions.showDosageOverview(recommendation.recommendation);
        Actions.hideModal();
    },
    onRightIconButtonClick: function() {
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
            
              <Toggle
                    name="toggleName1"
                    value="toggleValue1"
                    label="Did you drink?"  checkedLink={this.linkState("alcohol")}/>
              <Toggle
                    name="toggleName1"
                    value="toggleValue1"
                    label="Did you exercice?" checkedLink={this.linkState("sport")}/>
            <Toggle
                  name="toggleName1"
                  value="toggleValue1"
                  label="Did you eat?" checkedLink={this.linkState("eaten")}/>
               <RaisedButton style={{width:'100%'}} label="Next" secondary={true} ref="next" onClick={this.onSubmit}/>
               </Paper>
               <br/>
               <br/>
               <br/>
             </div>
             </div>
        );
    }
});

module.exports = RecurrentQuestions;
