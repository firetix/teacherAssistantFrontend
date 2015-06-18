var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ProductStore = require('../../stores/ProductStore.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var State = require('react-router').State;

var ProductPage = React.createClass({
  
  mixins: [ State ],

  getInitialState: function() {
    return { 
      product: ProductStore.getProduct(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
    ProductActionCreators.loadProduct(this.getParams().productId);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      product: ProductStore.getProduct(),
      errors: ProductStore.getErrors()
    }); 
  },
  render:function() {
    return (
      <div className="row">
          <span className="story__title label">product_name</span>
        <div className="story__body">{this.state.product.product_name}</div>
          <span className="label">product_name_2l</span>
        <div className="story__body">{this.state.product.product_name_2}</div>
          <span className="label">manufacturerl</span>
        <div className="story__body">{this.state.product.manufacturer}</div>
          <span className="label">dispenary_namel</span>
        <div className="story__body">{this.state.product.dispenary_name}</div>
          <span className="label">thc_dosel</span>
        <div className="story__body">{this.state.product.thc_dose}</div>
          <span className="label">nb_dosel</span>
        <div className="story__body">{this.state.product.nb_dose}</div>
          <span className="label">thc</span>
        <div className="story__body">{this.state.product.thc}</div>
          <span className="label">dry_weed</span>
        <div className="story__body">{this.state.product.dry_weed}</div>
          <span className="label">thc_3_party</span>
        <div className="story__body">{this.state.product.thc_3_party}</div>
          <span className="label">type_strain</span>
        <div className="story__body">{this.state.product.type_strain}</div>
          <span className="label">unit_of_mesure</span>
        <div className="story__body">{this.state.product.unit_of_mesure}</div>
          <span className="label">thc_uom</span>
        <div className="story__body">{this.state.product.thc_uom}</div>
          <span className="label">ingredients</span>
        <div className="story__body">{this.state.product.ingredients}</div>
          <span className="label">dairy</span>
        <div className="story__body">{this.state.product.dairy}</div>
          <span className="label">nutritions_extra</span>
        <div className="story__body">{this.state.product.nutritions_extra}</div>
          <span className="label">created_at</span>
        <div className="story__body">{this.state.product.created_at}</div>
          <span className="label">updated_at</span>
        <div className="story__body">{this.state.product.updated_at}</div>
          <span className="label">nuts</span>
        <div className="story__body">{this.state.product.nuts}</div>
          <span className="label">cbd_dose</span>
        <div className="story__body">{this.state.product.cbd_dose}</div>
          <span className="label">flavor</span>
        <div className="story__body">{this.state.product.flavor}</div>
          <span className="label">category</span>
        <div className="story__body">{this.state.product.category}</div>
          <span className="label">quantity</span>
        <div className="story__body">{this.state.product.quantity}</div>
          <span className="label">have_photo</span>
        <div className="story__body">{this.state.product.have_photo}</div>
          <span className="label">thc</span>
        <div className="story__body">{this.state.product.thc}</div>
          <span className="label">id</span>
        <div className="story__user">{this.state.product.id}</div>
      <a href="#" class="button expand">Get Dosage</a>
      </div>
     );
  }

});

module.exports = ProductPage;

