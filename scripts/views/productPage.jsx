var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var ProductStore = require('../stores/ProductStore.jsx');
var CardProductItem = require('../components/products/cardProductItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Spinner = require('../components/common/Spinner.jsx');


var Router = require('react-router');
var Link = Router.Link;

var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  Snackbar = mui.Snackbar,
  Paper = mui.Paper,
  RaisedButton = mui.RaisedButton;

var Product = React.createClass({


    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(ProductStore, 'onUpdate'),
           LoginRedirection
    ],

    statics: {
        willTransitionTo: function(transition, params) {
            Actions.getProduct(params.productId);
        }
    },
    getInitialState:function() {
      var productsData = ProductStore.getDefaultData();
        return {
            product: productsData.product,
            loading: true,
            autoHideDuration:2000,
            show_snack_bar:false
        };
    },

    onUpdate:function(producData) {
        this.setState({
            product: producData.product,
            loading: false
        });
    },
    onRightIconButtonClick:function(){

      if(Router.History.length >1){
            this.goBack();
          }else{
            this.transitionTo('entries',{
              pageNum:1
            });
          }
    },
    onAddToWishList:function(){
        var wish_list = this.props.user.wish_list || [];
        wish_list.push(this.state.product.id);
        Actions.updateAccount({
            wish_list: wish_list
        });
        this.refs.snack_bar.show();
    },
    onFindNearby:function(){

    },
    render:function() {
        var user = this.props.user;
        var product = this.state.product;
        var productId = this.getParams();
        var content;
        var test = "+ Add To Wish List";
        if(!this.state.loading && user.wish_list && user.wish_list.indexOf(product.id) != -1){
           test = "Saved";
        }
        if (this.state.loading) {
            content = <Spinner />;
        } else {
            content = (<div className="sp_main_content">
                <CardProductItem product={ product } user={ user } key={ product.id }  hideChevron={true}/>
                <div className="row container" style={{marginTop:10}}>
                   <RaisedButton style={{width:'100%'}} label={test} secondary={true} ref="next" onClick={this.onAddToWishList}/>
                 </div>
                 <div className="row">
                 <Paper zDepth={2} className="text-center">
                    <TextField disabled={true}
                      floatingLabelText="Name" hintText="Name" value={product.product_name + product.product_name_2}/>
                    
                    <TextField disabled={true}
                      floatingLabelText="Brand" hintText="Brand" value={product.manufacturer}/> 
                    <TextField disabled={true}
                      floatingLabelText="flavor" hintText="flavor" value={product.flavor}/> 
                    <TextField disabled={true}
                      floatingLabelText="thc" hintText="thc" value={product.thc}/> 
                    <TextField disabled={true}
                      floatingLabelText="unit_of_mesure" hintText="unit_of_mesure" value={product.unit_of_mesure}/> 
                </Paper>
                  </div> 
                  <Snackbar
                    message="Product added to your wishList"
                    autoHideDuration={this.state.autoHideDuration}
                    ref="snack_bar"/>
                </div>
            );
        }

        return (
            <div>
            <mui.AppBar
                title='Spoonfull'
                onLeftIconButtonTouchTap={this.onRightIconButtonClick}
                 iconClassNameLeft="fa fa-chevron-left"   className="app_bar" />
                              )
                { content }
            </div>
        );
    }

});

module.exports = Product;
