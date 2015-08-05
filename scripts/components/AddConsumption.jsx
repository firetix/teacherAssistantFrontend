var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  SelectField = mui.SelectField,
  DropDownMenu = mui.DropDownMenu;
var quantities = [
   { payload: '1/4', text: '1/4' },
   { payload: '1/2', text: '1/2' },
   { payload: '1', text: '1' },
   { payload: '2', text: '2' },
   { payload: '3', text: '3' },
   { payload: '4', text: '4' },
   { payload: '5', text: '5' }
];
var AddComsumption = React.createClass({
    mixins: [
        Reflux.listenTo(Actions.addDosageUI, 'addDosageUI')
    ],
    getInitialState: function () {
        return {
            quantity:'1',
            unitofmesures:'other',
            unit_of_mesure:this.props.entrie.product.unit_of_mesure 
        };
    },
    addDosageUI:function(params){

     var entrie = this.props.entrie;
     var media = {
         entrieId: entrie.id,
         quantity: this.state.quantity,
         unit_of_mesure: this.state.unit_of_mesure,
         type:"dose",
         creator: this.props.user.full_name,
         creatorUID: this.props.user.uid,
         time: Date.now()
     };
     Actions.addMedia(media);
     Actions.hideModal();
    },
    onQuantityChange: function(ev) {
        this.setState({
            quantity:React.findDOMNode(ev.currentTarget).value.payload
        });
    },
    onUnitOfmesureChange: function(ev) {
        this.setState({
            unit_of_mesure:React.findDOMNode(ev.currentTarget).value.payload || product.unit_of_mesure
        });
    },
    render:function() {
        var product = this.props.entrie.product;
        var unitofmesures = [{ payload: product.unit_of_mesure, text: product.unit_of_mesure}, { payload: 'Other', text: 'Other' }];
        return (
                 <div className="container">
                    <h6 >I&#39;m taking</h6>
                   
                    <SelectField ref="quantity_select"
                      value={this.state.quantity}
                      onChange={this.onQuantityChange}
                      menuItems={quantities}  style={{maxWidth:'150px', display:'inline-block'}}/>
                    <SelectField ref="unit_of_mesure_select"
                      value={product.unit_of_mesure}
                      onChange={this.onUnitOfmesureChange}
                      menuItems={unitofmesures} style={{maxWidth:'150px', display:'inline-block'}} />
                    
                    
                 </div>
        );
    }
});

module.exports = AddComsumption;
