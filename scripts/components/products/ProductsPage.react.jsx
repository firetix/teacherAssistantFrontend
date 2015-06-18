var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ProductStore = require('../../stores/ProductStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var timeago = require('timeago');
var PubSub = require('pubsub');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Auth = require('j-toker');

var ProductsPage = React.createClass({
        getInitialState: function() {
            return {
                products: ProductStore.getAllProducts(),
                errors: [],
                user: SessionStore.getUser()
            };
        },

        componentDidMount: function() {
            ProductStore.addChangeListener(this._onChange);
            ProductActionCreators.loadProducts();
        },

        componentWillUnmount: function() {
            ProductStore.removeChangeListener(this._onChange);
        },

        _onChange: function() {
            this.setState({
                products: ProductStore.getAllProducts(),
                errors: ProductStore.getErrors()
            });
        },

        render: function() {
            var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
            return (
              <div>
                {errors}
                <div className="row">
                  <ProductList products={this.state.products} />
                </div>
              </div>
            );
        }


});






var ProductItem = React.createClass({
  render: function() {
    return (
      <li className="story">
        <div className="story__title">
          <Link to="product" params={ {productId: this.props.product.id} }>
            {this.props.product.product_name}
          </Link>
        </div>
        <div className="story__body">{this.props.product.manufacturer}...</div>
      </li>
      );
  }
});

var ProductList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.products.map(function(product, index){
          return <ProductItem product={product} key={"product-" + index}/>
        })}
      </ul>
    );
  }
});


module.exports = ProductsPage;