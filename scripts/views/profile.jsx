var Reflux = require('reflux');
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;
var Router = require('react-router');
var SessionStore = require('../stores/SessionStore.react.jsx');
var Product = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var moment = require('moment');
var PhotoUploadButton = require('../components/PhotoUploadButton.jsx');
var _ = require('underscore');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  Tab = mui.Tab,
  TextField = mui.TextField,
  Tabs = mui.Tabs,
  Snackbar = mui.Snackbar,
  RaisedButton = mui.RaisedButton,
  FontIcon = mui.FontIcon,
  DatePicker = mui.DatePicker,
  Paper = mui.Paper,
  IconButton = mui.IconButton,
  Avatar = mui.Avatar;
var Profile = React.createClass({
	mixins: [
	    Router.Navigation,
	     React.addons.LinkedStateMixin,
	      Reflux.listenTo(SessionStore, 'userUpdate'),
	      Reflux.listenTo(Actions.getWishList.completed, 'onWishListUpdate'),
	      LoginRedirection
	],
	getInitialState: function () {
		var obj =  this.props.user;
		obj.autoHideDuration = 2000;
	    return obj
	},
	componentWillMount: function () {
		Actions.getWishList( this.props.user.wish_list  );
	},
	onWishListUpdate:function(params){
		this.setState({
			wish_list_products:params.products
		});
	},
	  userUpdate: function(triggerName, user) {
	      switch (triggerName) {
	          case 'accountUpdateSuccess':
	          	var obj = user;
	          	this.setState(user);
	          	Actions.getWishList( this.state.wish_list  );
	              break;
	          case 'accountUpdateError':
	          	debugger;
	              // React.findDOMNode(this.refs.submit).disabled = false;
	              // this.setState({
	              //     user: user,
	              //     errors: errors
	              // });
	              break;
	      }
	  },
	  onChange:function(obj){
        this.setState({
            birthdate: moment(React.findDOMNode(obj.currentTarget).value).format("MM/DD/YYYY")
        });
	  },
    onLeftIconButtonTouchTapLoggedin: function() {
    	console.log("profile left button click");
        this.transitionTo('entries', {
            pageNum: 1
        });
    },
    onRemoveProductWishList: function(product) {
        var wish_list = this.props.user.wish_list || [];
        wish_list.pop(product.id);
        if(wish_list.length ==0){
        	wish_list = "[]"
        }
        Actions.updateAccount({
            wish_list: wish_list 
        });
        this.refs.snack_bar.show();
    },
    onAddPhoto: function() {

    },
    onSubmit:function(){
    	Actions.updateAccount({
    	    birthdate: this.state.birthdate.trim(),
    	    height: this.state.height.trim(),
    	    weight: this.state.weight.trim(),
    	    gender: this.state.gender.trim(),
    	    experience_level: this.state.experience_level.trim()
    	});
    	  this.refs.snack_bar_profile.show();
    },
    onChange:function(){

    },
    onUploadCompleted:function(photo_url){
    	Actions.updateAccount({
    	    photo_url: photo_url
    	});
    },
    render:function() {
    	var user = this.props.user;
    	var upload_area;
    	var _this =this;
    	if(this.state.wish_list_products){
    	var products = this.state.wish_list_products;
    		products = products.map(function(product) {
    		      return <Product product={ product } user={ user } key={ product.id } showDelete={true} onClick={_this.onRemoveProductWishList}/>;
    		  });
    	}
		upload_area =(<div>
			<Avatar src={user.photo_url || "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/wooman.png"}  size={100}/>
			<br/>
			<p>
			<div className="text-center">
			<div style={{width:'100px',height:'30px',margin:'0 auto'}}>
				<PhotoUploadButton {...this.state}{ ...this.props } entrie={this.state.params} onUploadCompleted={this.onUploadCompleted}/>
			</div>
			</div>
			</p>
			</div>
			)
    	
        return (
        	<div>
        	<mui.AppBar 
        	         title='Spoonfull' disableTouchRipple={true}
        	          onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTapLoggedin}
 						iconElementLeft={<IconButton iconClassName="fa fa-chevron-left" disableTouchRipple={true} onClick={this.onLeftIconButtonTouchTapLoggedin}></IconButton>}  className="app_bar"/>
	 		<div className="text-center sp_main_content">
	 			      {upload_area}
	 			      <p>{this.state.full_name}</p>
	 		</div>
	 		<Tabs> 
	 		  <Tab label="Badges" > 
	 		  <br/>
	 		   <div className="container">
	 		   <div className="row">
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>  
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
   					<div className="col-xs-4 text-center">
   							<i className="fa fa-certificate fa-5 sensation_icon"></i>
   					</div>
	 		   </div>
	 		   </div>
	 		  </Tab> 
	 		  <Tab label="Wish List" > 
	 		  	{products}
	 		  	<Snackbar
	 		  	  message="Product removed"
	 		  	  autoHideDuration={this.state.autoHideDuration}
	 		  	  ref="snack_bar"/>
	 		  </Tab> 
	 		  <Tab label="Me" > 
	 		     <Paper zDepth={2} className="text-center" >
	 		  		<div className="text-center container">
	 		  	      <TextField
	 		  	      valueLink={this.linkState("height")}
	 		  	        hintText="Height"
	 		  	        defaultValue="0"
	 		  	        floatingLabelText="Height" /><br/>
	 		  	      <TextField
	 		  	      valueLink={this.linkState("weight")}
	 		  	        hintText="Weight"
	 		  	        defaultValue="0"
	 		  	        floatingLabelText="Weight" /><br/>
	 		  	      <TextField
	 		  	      valueLink={this.linkState("full_name")}
	 		  	        hintText="Full Name"
	 		  	        defaultValue="Default Value"
	 		  	        floatingLabelText="Full Name" /><br/>
	 		  	        <TextField
	 		  	        value={moment(this.state.birthdate).format("YYYY-MM-DD")}
	 		  	          hintText="Birthdate"
	 		  	          defaultValue="Default Value"
	 		  	          floatingLabelText="Birthdate"
	 		  	          type="date"
	 		  	          onChange={this.onChange}
	 		  	          /><br/>
	 		  	      <TextField
	 		  	      valueLink={this.linkState("gender")}
	 		  	        hintText="gender"
	 		  	        defaultValue="Default Value"
	 		  	        floatingLabelText="gender" /><br/>
	 		  	        <TextField
	 		  	        valueLink={this.linkState("experience_level")}
	 		  	          hintText="experience_level"
	 		  	          defaultValue="Default Value"
	 		  	          floatingLabelText="experience_level" />
	 		  	          <Snackbar
	 		  	            message="Saved"
	 		  	            autoHideDuration={this.state.autoHideDuration}
	 		  	            ref="snack_bar_profile"/>
	 		  	      <div className="text-right">
	 		  	      	<RaisedButton label="Save" style={{width:'100%'}} secondary={true} ref="save" onClick={this.onSubmit}/>
	 		  	      </div>
	 		  	      <br/>
	 		 	</div>
	 		  	</Paper>
	 		  </Tab> 
	 		</Tabs> 

	 		</div>

        );
    }
});

module.exports = Profile;
