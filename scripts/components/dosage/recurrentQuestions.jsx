var Reflux = require('Reflux');
// actions
var Actions = require('../../actions/Actions');
// components

var Router = require('react-router');
var Link = Router.Link;
var DosageStore = require('../../stores/dosageStore.jsx');
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
        Reflux.listenTo(DosageStore, 'dosageUpdate')
    ],
    onSubmit: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.next).disabled = true;
        Actions.createRecommendation({
            recommendation: {
                alcohol: this.sliderAlcohol.getValue(),
                sport: this.sliderSport.getValue(),
                eaten: this.sliderEaten.getValue()
            }
        });
  },
  dosageUpdate: function(params,recommendation) {
      // this.transitionTo('overview',{
      //   productId:this.getParams().productId,
      //   recommendationId:recommendation.recommendation.id
      // });
    debugger;
  },
  onToggleAlcohol:function(){
    debugger;
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
                    label="Did you drink?" onToggle={this.onToggleAlcohol}/>
              <Toggle
                    name="toggleName1"
                    value="toggleValue1"
                    label="Did you exercice?"/>
            <Toggle
                  name="toggleName1"
                  value="toggleValue1"
                  label="Did you eat?"/>
               <RaisedButton style={{width:'100%'}} label="Next" secondary={true} ref="next" onClick={this.onSubmit}/>
             </div>
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
