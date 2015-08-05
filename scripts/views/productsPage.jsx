var Reflux = require('reflux');
var React = require('react');
var Actions = require('../actions/Actions');

var ProductsStore = require('../stores/ProductsStore.react.jsx');


var InfiniteScroll = require('react-infinite-scroll')(React);
var Spinner = require('../components/common/spinner.jsx');
var Product = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  ListDivider = mui.ListDivider,
  Colors = mui.Styles.Colors,
  Avatar = mui.Avatar,
  List = mui.List,
  Paper = mui.Paper,
  TextField = mui.TextField;


var Products = React.createClass({

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(ProductsStore, 'onStoreUpdate'),
        LoginRedirection,
        React.addons.LinkedStateMixin
    ],
    getInitialState: function() {
        var productsData = ProductsStore.getDefaultData();
        return {
            loading: false,
            products: productsData.products,
            sortOptions: productsData.sortOptions,
            nextPage: productsData.nextPage,
            currentPage: productsData.currentPage,
            perPage: productsData.perPage
        };
    },
    onStoreUpdate: function(productsData) {
        this.setState({
            loading: false,
            products: productsData.products,
            sortOptions: productsData.sortOptions,
            nextPage: productsData.nextPage,
            currentPage: productsData.currentPage,
            perPage:productsData.perPage
        });
    },
    searchTerm:function(){
        Actions.getProducts({   
            currentPage: 1,
            perPage: this.state.perPage,
            searchTerm:this.refs.search.getValue().trim()
        });
    },
    loadFunc:function(){
      if(this.state.loading){
        return;
      }

      this.setState({
        loading:true
      });
      Actions.getProducts({ 
          currentPage: (this.state.currentPage +1 ),
          perPage: this.state.perPage,
          searchTerm:this.refs.search.getValue().trim()
      });
    },
    render: function() {
        var products = this.state.products;
        var currentPage = this.state.currentPage || 1;
        var user = this.props.user;
        var page;
        var pageNum  =  1;
        if(pageNum == 9 || (products.length ==0 && !this.state.loading)){
            page = ( <p> No Products Found </p>)
        }
        products = products.map(function(product) {
              return <Product product={ product } user={ user } key={ product.id } triggerSelection={true}/>;
          });
        var productsJsx = (<InfiniteScroll
            pageStart={this.state.currentPage}
            loadMore={this.loadFunc}
            hasMore={this.state.nextPage}
            threshold={5}
            loader={<Spinner />}>
          {products} 
        </InfiniteScroll>);
        return ( 
          <Paper zDepth={2} className="text-center">
            <TextField
              floatingLabelText="Search" hintText="Product name or Brand or flavor" onChange={this.searchTerm} ref="search" type="search"/> 
             { productsJsx }
          </Paper>
          
        );
    }

});

module.exports = Products;