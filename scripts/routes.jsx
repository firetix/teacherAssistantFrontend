var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var SpoonfullApp = require('./components/SpoonfullApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var ProductsPage = require('./components/products/ProductsPage.react.jsx');
var ProductPage = require('./components/products/ProductPage.react.jsx');
var ProductNew = require('./components/products/ProductNew.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={SpoonfullApp}>
    <DefaultRoute handler={LoginPage} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="products" path="/products" handler={ProductsPage}/>
    <Route name="product" path="/products/:productId" handler={ProductPage} />
    <Route name="new-product" path="/product/new" handler={ProductNew}/>
  </Route>
);

