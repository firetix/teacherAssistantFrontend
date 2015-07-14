var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var ProductsStore = require('../stores/ProductsStore.react.jsx');

var Spinner = require('../components/common/spinner.jsx');
var Product = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Products = React.createClass({

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(ProductsStore, 'onStoreUpdate'),
        LoginRedirection
    ],
    getInitialState: function() {
        var productsData = ProductsStore.getDefaultData();
        return {
            loading: true,
            products: productsData.products,
            sortOptions: productsData.sortOptions,
            nextPage: productsData.nextPage,
            currentPage: productsData.currentPage,
            perPage: productsData.perPage
        };
    },
    statics: {
        willTransitionTo:function(transition, params) {
            Actions.getProducts({	
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
        }
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
            perPage: this.perPage,
            searchTerm:React.findDOMNode(this.refs.search_term).value.trim()
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
        // else if(pageNum >1 ){
        //     page = (   <div className="pagination pagination-success"><Link to="products" params={{ pageNum: pageNum*1 - 1 }} className="btn btn-success previous">
        //                         Previous
        //                     </Link>
        //                     <Link to="products" params={{ pageNum: pageNum*1 + 1 }} className="btn btn-success next">
        //                         Next
        //                     </Link></div>)
        // }else{
        //     page = ( <div className="pagination pagination-success"> <Link to="products" params={{ pageNum: pageNum*1 + 1 }} className="btn btn-success next">
        //                         Next
        //                     </Link></div>)
        // }
        console.log(products)
        products = products.map(function(product) {
              return <Product product={ product } user={ user } key={ product.id } />;
          });
        return ( < div className = "content full-width" >
            <div className="input-group input-group-hg input-group-rounded">
              <span className="input-group-btn">
                <button type="submit" className="btn"><i className="fa fa-search"></i></button>
              </span>
              <input type="text" ref="search_term" onChange={this.searchTerm} className="form-control" placeholder="Search" id="search-query-2"></input>
            </div>
            < div className = "products" >
             { this.state.loading ? <Spinner /> : products }
            < /div>
            {page}
            </div >
        );
    }

});

module.exports = Products;