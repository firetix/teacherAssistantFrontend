var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components

var Router = require('react-router');
var Slider = require("bootstrap-slider");
var Link = Router.Link;
var DosageStore = require('../stores/dosageStore.jsx');


var RecurrentQuestions = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(DosageStore, 'dosageUpdate')
    ],
    onSubmit: function(e) {
        e.preventDefault();
        React.findDOMNode(this.refs.submit).disabled = true;
        Actions.createRecommendation({
            recommendation: {
                alcohol: this.sliderAlcohol.getValue(),
                sport: this.sliderSport.getValue(),
                eaten: this.sliderEaten.getValue()
            }
        });
  },
    componentDidMount: function() {
        this.sliderAlcohol = new Slider("#ex13", {
            ticks: [0, 1, 2],
            ticks_labels: ['no', '< 2h ago', '< 4h ago'],
            ticks_snap_bounds: 1,
            value:0
        });
        this.sliderSport = new Slider("#ex14", {
            ticks: [0, 1],
            ticks_labels: ['no', 'yes'],
            ticks_snap_bounds: 1,
            value:0
        });
        this.sliderEaten = new Slider("#ex15", {
            ticks: [0, 1],
            ticks_labels: ['no', 'yes'],
            ticks_snap_bounds: 1,
            value:0
        });
    },
dosageUpdate: function(params,recommendation) {
    Actions.hideModal();
},
    render:function() {

        return (
                  <form role="form" onSubmit={this.onSubmit }>
        <div className="form-group">
          <label className="control-label" htmlFor="InputAge">did you drink in the past two hours</label>
        </div>
          <input id="ex13" type="text" data-slider-ticks="[0, 1, 2]" data-slider-ticks-snap-bounds="1" data-slider-ticks-labels="['no','less than two hours ago', 'less than 4 hours ago']"/>
        <div className="form-group">
          <label className="control-label" htmlFor="InputHeight">sport</label>
        </div>
         <input id="ex14" type="text" data-slider-ticks="[0, 1]" data-slider-ticks-snap-bounds="1" data-slider-ticks-labels="['yes','no']"/>
        <div className="form-group">
          <label className="control-label" htmlFor="InputWeight">Did you eat in the past two hours</label>
        </div>
         <input id="ex15" type="text" data-slider-ticks="[0, 1]" data-slider-ticks-snap-bounds="1" data-slider-ticks-labels="['yes','no']"/>
         <div className="form-group">
         </div>
        <button type="submit" className="btn" ref="submit">Submit</button>
      </form>
        );
    }
});

module.exports = RecurrentQuestions;
