// actions
var Actions = require('../../actions/Actions');
// components
var Link = require('react-router').Link;

var Product = React.createClass({

    propTypes: {
        user: React.PropTypes.object,
        product: React.PropTypes.object
    },
    onProductselected:function(){
      Actions.productSelected(this.props.product);
    },
    render:function() {
        var user = this.props.user;
        var product = this.props.product;
        var source = "";
        if(product.file_name){
          source = "http://media.spoonfull.io.s3.amazonaws.com/photos/" + product.file_name + ".jpg"
        }
        return ( 
       <div className="container">
                <div className="row">
                    <div className="col-xs-4 col-md-4 text-center">
                        <img id="detail-icon-img" src={source}  alt="note, paper icon" width="90" height="90"></img>
                    </div>
                    <div className="col-xs-8 col-md-8">
                        <p>   <a  onClick={this.onProductselected} className="post-title" to="product" params={{ productId: product.id }}>
                    {product.product_name + (product.product_name_2|| "")}
                       </a></p> 
                       <span className="hostname">
                          made by {product.manufacturer}
                       </span>        
                    </div>

                </div>
                    <div className="line-seperator"></div>     
                </div>
        );
    }
});

module.exports = Product;
