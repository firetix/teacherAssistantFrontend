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

        return ( 

                    <div>
                                <div className="navbar-fixed">
            <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Chestnut</a>
            </div>
          </nav>
          </div>
          <div> Students</div>
          </div>
        );
    }

});

module.exports = Products;