var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var ProductStore = require('../stores/ProductStore.jsx');
var ProductComponent = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Spinner = require('../components/common/Spinner.jsx');


var Router = require('react-router');
var Link = Router.Link;


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
            loading: true
        };
    },

    onUpdate:function(producData) {
        this.setState({
            product: producData.product,
            loading: false
        });
    },

    onGetDosage: function() {
        var product = this.state.product;
        if(this.props.user.birthdate){
          Actions.showModal('recurrentQuestions',product);                    
        }else{
          Actions.showModal('demographicQuestions',product);          
        }
    },
    render:function() {
        var user = this.props.user;
        var product = this.state.product;
        var productId = this.getParams();
        var content;

        if (this.state.loading) {
            content = <Spinner />;
        // } else if (product.isDeleted) {
        //     this.replaceWith('404');
        } else {
            // reviews = reviews.map(function(product) {
            //     return <Review product={ product } user={ user } key={ product.id } />;
            // });
            content = (
                <div>
                  <div className="section">
                      <div className="container-fluid">
                                <div className="panel panel-info">
                                  <div className="panel-heading">
                                  <h5>{product.product_name +  (product.product_name_2|| "")}</h5>
                                  </div>  
                        <div className="row">
    
                              <div className="col-xs-9 col-md-9">

                                 <div className="panel-body">
                                    <label>productId:</label>
                                    <p>{productId}</p>
                                
                                    <label>Manufacturer:</label>
                                    <p>{product.manufacturer}</p>
                                
                                    <label>product_name:</label>
                                    <p>{product.product_name + product.product_name_2}</p>
                                
                                    <label>flavor:</label>
                                    <p>{product.flavor}</p>
                                
                                    <label>Category:</label>
                                    <p>{product.category}</p>
                                
                                    <label>ingredients:</label>
                                    <p>{product.ingredients}</p>
                                
                                    <label>thc:</label>
                                    <p>{product.thc}</p>
                                
                                    <label>thc_dose:</label>
                                    <p>{product.thc_dose}</p>
                                
                                    <label>type_strain:</label>
                                    <p>{product.type_strain}</p>
                                
                                    <label>Quantity:</label>
                                    <p>{product.quantity}</p>
                                
                                    <label>cbd_dose:</label>
                                    <p>{product.cbd_dose}</p>
                                
                                    <label>dry_weed:</label>
                                    <p>{product.dry_weed}</p>
                                
                                    <label>thc_3_party:</label>
                                    <p>{product.thc_3_party}</p>
                                
                                    <label>dispenary_name:</label>
                                    <p>{product.dispenary_name}</p>
                                
                                    <label>unit_of_mesure:</label>
                                    <p>{product.unit_of_mesure}</p>
                                
                                    <label>nutritions_extra:</label>
                                    <p>{product.nutritions_extra}</p>
                                
                                    <label>dairy:</label>
                                    <p>{product.dairy}</p>
                            
                                    <label>nuts:</label>
                                    <p>{product.nuts}</p>
                                  </div>  
                                
                                  <div className="panel-footer text-center">
                                  <button type="button" className="btn btn-hg btn-primary" onClick={this.onGetDosage}>Get Dosage</button> 
                                  </div>
                                </div>

                                 
                              <div className="col-xs-3 col-md-3">
                                <img id="detail-icon-img" src="https://lh6.googleusercontent.com/lsLrGHwODjUBlvPqjt7Zvu4AJsBJxHNoJgiEmoU4y2NomVJYIsMr-UtlPHkJrEt8ECPDyQ=w1117-h1225" alt="note, paper icon" width="200" height="200"></img>
                              </div>
                              </div>
                              
                          </div>
                      </div>
                  </div>
                </div>
            );
        }

        return (
            <div className="content full-width">
                { content }
            </div>
        );
    }

});

module.exports = Product;
