var Reflux = require('Reflux');
// actions
var Actions = require('../../actions/Actions');
var ProductStore = require('../../stores/ProductStore.jsx');
// components

var Router = require('react-router');

var Link = Router.Link;
var SessionStore = require('../../stores/SessionStore.react.jsx');
var DosageStore = require('../../stores/dosageStore.jsx');

var DosageOverview = React.createClass({
    mixins: [
        Router.Navigation,
        Reflux.listenTo(ProductStore, 'onUpdate'),
        Reflux.listenTo(DosageStore, 'dosageUpdate')
    ],
    statics: {
        willTransitionTo: function(transition, params) {

            Actions.getProduct(params.productId);
            Actions.getRecommendation(params.recommendationId);
        }
    },
    onUpdate: function(productData) {
        this.product = productData.product;
        if (this.dosage) {
            this.calculateDosageState();
        }
    },
    dosageUpdate: function(event, params) {
        this.dosage = params.recommendation;
        if(this.dosage.checkin_start){

        }
        if (this.product) {
            this.calculateDosageState();
        }
    },
    calculateDosageState: function(level) {
        var user = SessionStore.getUser();
        var level = level || 'medium';
        var recommendation;
        var product;
        if (!this.product || !this.dosage) {
            return;
        }
        var dosage = 0;
        var imb = (user.weight) / (user.height) * 2;
        if (imb < 18.5) {
            dosage = dosage - 10;
        } else if (18.5 < imb < 24.9) {
            dosage = dosage + 15;
        } else if (25 < imb < 29.9) {
            dosage = dosage + 20;
        } else {
            dosage = dosage + 25;
        }
        if (user.experience_level == 5) {
            dosage = dosage + 25;

        } else {
            dosage = dosage + ((user.experience_level - 2) * 5)
        }
        // if(user.birthdate)
        if (user.gender == "m") {
            dosage = dosage + 10;
        } else if (user.gender == "f") {
            dosage = dosage + 5;
        }

        if (this.dosage.alcohol) {
            dosage = dosage - 5;
        } else if (this.dosage.sport) {
            dosage = dosage - 5;
        }
        if (this.dosage.eaten) {
            dosage = dosage + 10;
        }
        console.log('recommended dose ' + dosage);
        dosage = Math.floor(dosage * 10 / this.product.thc_dose) / 10
        this.setState({
            dosageValue: dosage
        });
    },
    getInitialState: function() {
        return {
            dosageValue: 0,
            selected: null
        }
    },
    setHighLevelLow: function() {
        this.setState({
            'selected': 'low'
        });
        $(React.findDOMNode(this.refs.low)).siblings().removeClass("active");
        $(React.findDOMNode(this.refs.low)).addClass("active");
    },
    setHighLevelHigh: function() {
        this.setState({
            'selected': 'high'
        });
        $(React.findDOMNode(this.refs.high)).siblings().removeClass("active");
        $(React.findDOMNode(this.refs.high)).addClass("active");
    },
    setHighLevelMedium: function() {
        this.setState({
            'selected': 'medium'
        });
        $(React.findDOMNode(this.refs.medium)).siblings().removeClass("active").addClass("active");
        $(React.findDOMNode(this.refs.medium)).addClass("active");
    },
    componentDidMount: function() {
        $(React.findDOMNode(this.refs.medium)).addClass("active");
    },
    update: function() {
        var myTime = $worked.html();
        var ss = myTime.split(":");
        var dt = new Date();
        dt.setHours(0);
        dt.setMinutes(ss[0]);
        dt.setSeconds(ss[1]);

        var dt2 = new Date(dt.valueOf() + 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");

        $worked.html(ts[1] + ":" + ts[2]);
        setTimeout(update, 1000);
    },
    startTimer: function() {


    // setTimeout(update, 1000);
        Actions.updateRecommendation({
            checkin_start: new Date().toString(),
            recomendation: this.state.dosageValue,
            high_level:this.state.selected || "medium",
            recommendationId:this.dosage.id
        });

    },
    addReview:function(e){
    	e.preventDefault();
    	Actions.createReview({
    	    product_id: this.product.id,
    	    recommendation_id:this.dosage.id,
    	    comment:React.findDOMNode(this.refs.recommendation_text).value.trim()
    	});

    },
      componentWillUpdate: function (nextProps, nextState) {
         if (!SessionStore.getUser().signedIn ) {
        this.transitionTo('/login');
      }  
  },
    render: function() {
    	var timer = (<button type="button" className="btn btn-default" onClick={this.startTimer}>I eat it!</button > )
    	if(this.dosage && this.dosage.checkin_start){
    		timer =(
    			<div>
    			<div id="timer">
    			</div>
    			<form className='product-form' onSubmit={ this.addReview }>
                    <textarea placeholder="Recomendation Review" ref="recommendation_text" className="product-input full-width"></textarea>
                    <button type="submit" className="button button-primary">Submit</button>
                </form>
    			</div>)
    	}
        var dosageValue = 0;
        if (this.state.selected == "low") {
            dosageValue = this.state.dosageValue - (this.state.dosageValue * (0.2));
        } else if (this.state.selected == "high") {
            dosageValue = this.state.dosageValue * 2;

        } else {
            dosageValue = this.state.dosageValue;
        }
        var dosageValue = this.state.dosageValue ? ( < div > < div className = "success success-danger"
            role = "success" > {
                dosageValue + " " + this.product.unit_of_mesure
            } < /div>   {timer}< /div>):(<div></div > )
        return (

            < div >
            < h4 > Choose your desired high level < /h4>
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" ref="low" onClick={this.setHighLevelLow}>Low</button >
            < button type = "button"
            className = "btn btn-default"
            ref = "medium"
            onClick = {
                this.setHighLevelMedium
            } > Medium < /button>
              <button type="button" className="btn btn-default" ref="high" onClick={this.setHighLevelHigh}>High</button >
            < /div>
            <h3>
            {dosageValue}
            </h3>
           
          </div >
        );
    }
});

module.exports = DosageOverview;