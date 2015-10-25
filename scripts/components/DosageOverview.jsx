// components
var Actions = require('../actions/Actions');
var Router = require('react-router');
var Link = Router.Link;
var AddConsumption = require('./AddConsumption.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  FlatButton = mui.FlatButton,
  Table = mui.Table,
  DropDownMenu = mui.DropDownMenu,
  RaisedButton = mui.RaisedButton,
  Paper = mui.Paper,
  Dialog = mui.Dialog;

  // Row data
  var rowData = [
    {low: {content: '4'}, medium: {content: '7'}, high: {content: '8'}}
  ];



  // Column configuration
  var headerCols = {
    low: {
      content: 'Low',
      tooltip: 'Low dosage'
    },
    medium: {
      content: 'Medium',
      tooltip: 'Medium dosage'
    },
    high: {
      content: 'High',
      tooltip: 'High Dosage'
    }
  };
  var colOrder = ['low', 'medium', 'high'];

  // Table component

      
var DosageOverview = React.createClass({
	mixins: [
	    Router.Navigation
	],
    onRightIconButtonClick:function(){
      Actions.goBackDosage();
    },
    onSubmit:function(){
      Actions.addDosageUI();
    },
    calculateDosageState: function(level) {
      
        var user = SessionStore.getUser();
        var level = level || 'medium';
        var recommendation;
        var product = this.props.product;
        var base_unit;
        if (user.gender == "m") {
           base_unit = 10;
        } else if (user.gender == "f") {
            base_unit = 7;
        }
        var dosage = 0;
        if(user.experience_level){
          base_unit = base_unit + user.experience_level*1;
        }
        if(level=="low"){
          dosage = base_unit *1;
        }else if(level =="medium"){
          dosage = base_unit *(2);
        }else if(level == "high"){
          dosage = base_unit *5;
        }
        // if(user.birthdate)
        // if (user.gender == "m") {
        //     dosage = dosage + 10;
        // } else if (user.gender == "f") {
        //     dosage = dosage + 5;
        // }

        // if (this.dosage.alcohol) {
        //     dosage = dosage - 5;
        // } else if (this.dosage.sport) {
        //     dosage = dosage - 5;
        // }
        // if (this.dosage.eaten) {
        //     dosage = dosage + 10;
        // }
        console.log('recommended dose ' + dosage);
        if (product.thc_dose) {
            dosage = Math.floor(dosage * 10 / product.thc_dose) / 10
        }
       
        return dosage;
    },
    render:function() {
    	var navBar;
      var entrie = this.props.entrie;
      var product = this.props.product;
    	var menu;
        // var tableState = {
        //     fixedHeader: true,
        //     fixedFooter: true,
        //     stripedRows: false,
        //     showRowHover: false,
        //     selectable: true,
        //     multiSelectable: false,
        //     canSelectAll: false,
        //     deselectOnClickaway: true,
        //     height: '300px',
        //     rowData: rowData
        // };
        return (

            <div >
            <mui.AppBar
                title='Spoonfull'
                onLeftIconButtonTouchTap={this.onRightIconButtonClick}
                 iconClassNameLeft="fa fa-chevron-left"    />
              <div className="container">
              <br/>
              <br/> 
              <Paper zDepth={2} className="text-center">
                 <div className="row">
                 <br/>
                  <div className="col-xs-3">
                  <div className="text-bottom">
                  <br/>
                   {product.unit_of_mesure}
                  </div>
                 </div>
                 <div className="col-xs-9 col-offset-xs-5">
                    <div className="row">
                         <div className="col-xs-3">
                          low
                        </div>
                         <div className="col-xs-3">
                          medium 
                        </div>
                         <div className="col-xs-3">
                          high
                        </div>
                    </div> 
                    <div className="row">
                         <div className="col-xs-3">
                          {this.calculateDosageState('low')}
                        </div>
                         <div className="col-xs-3">
                          {this.calculateDosageState('medium')}
                        </div>
                         <div className="col-xs-3">
                          {this.calculateDosageState('high')}
                        </div>
                    </div>
                  </div>
                 </div>
                 <div className="row">
                  <p>* based on data from our users </p>
                 </div>

                  <AddConsumption {...this.state}{ ...this.props } entrie={entrie} />
                  <div className="row container" style={{marginTop:10}}>
                   <RaisedButton style={{width:'100%'}} label="Submit" secondary={true} ref="submit" onClick={this.onSubmit}/>
                   </div>
                   </Paper>

              </div>
            
            </div>
        );
    }
});

module.exports = DosageOverview;
