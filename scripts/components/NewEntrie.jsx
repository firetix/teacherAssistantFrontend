var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var ProductsPage = require('../views/productsPage.jsx');
var Product = require('./products/productItem.jsx');
var React = require('react');
var Router = require('react-router');
// components
var Link = require('react-router').Link;
var injectTapEventPlugin = require("react-tap-event-plugin");
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  Paper = mui.Paper,
  Dialog = mui.Dialog,
  RaisedButton = mui.RaisedButton;

var NewEntrie = React.createClass({
    mixins: [
    Router.Navigation,
    Router.State,
          React.addons.LinkedStateMixin,
          Reflux.listenTo(Actions.productSelected, 'productSelected'),
          Reflux.listenTo(Actions.submitEntrie.completed, 'onSuccess'),
          Reflux.listenTo(Actions.submitEntrie.failed, 'onError')
    ],
    componentWillMount: function () {
        injectTapEventPlugin();  
    },
    getInitialState: function() {
      return { ailement:'',activity:'',product:{} };
    },
    onAddProduct:function(e){
            // this.refs.dialog.show();
            Actions.showModal('selectProduct');
    },
    onSuccess:function(){
    	this.transitionTo
    },
    onError:function(){

    },
    onCreateEntrie:function(e){
    		e.preventDefault();

    		var user = this.props.user;

    		var tripp = {
    		    title: this.state.product.product_name,
    		    creatorId: user.id,
    		    // profileImage:this.full_image_url,
    		    creatorEmail: user.uid,
    		    creatorName: user.full_name,
    		    time: Date.now(),
    		    product:this.state.product,
    		    productId:this.state.product.id,
    		    ailement:this.state.ailement,
    		    activity:this.state.activity
    		};
    		this.setState({
    		    image_url:null
    		});
    		Actions.submitEntrie(tripp);
    },
    productSelected:function(product){
    	this.setState({
    		product:product
    	});
    	//create action to update entries
    	 Actions.hideModal();
    },
    render:function() {
    	var productJsx = (<RaisedButton label="Add product" secondary={true} onClick={this.onAddProduct} />)
    	if(this.state.product.id){
    		productJsx= (<div><Product onClick={this.onAddProduct} product={ this.state.product } user={ this.props.user } key={ this.state.product.id } /><br/><br/><RaisedButton label="Save" secondary={true} onClick={this.onCreateEntrie} /></div>)
    	}
        return (
            <div>
                 <form className='comment-form' onSubmit={ this.addEntrie }>
                 <br/>
                 <Paper zDepth={2} className="text-center">
                    <div className="form-group">
                        <TextField
                        valueLink={this.linkState("activity")}
                          floatingLabelText="Activity">
                        </TextField>
                     </div>
                    <p>or</p>
                    <div className="form-group">
                        <TextField
                        valueLink={this.linkState("ailement")}
                          floatingLabelText="Ailement">
                        </TextField>
                     </div>
                     <br/>
                </Paper>
                 <br/>
                  <br/>
                    <div className="form-group text-center">
                    	{productJsx}
                     </div>
                </form>
                </div>
        );
    }
});

module.exports = NewEntrie;
