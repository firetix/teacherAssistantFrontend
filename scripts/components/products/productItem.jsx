// actions
var Actions = require('../../actions/Actions');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  ListDivider = mui.ListDivider,
  Colors = mui.Styles.Colors,
  Avatar = mui.Avatar,
  ListItem = mui.ListItem;


var Product = React.createClass({

    propTypes: {
        user: React.PropTypes.object,
        product: React.PropTypes.object
    },
    onProductselected:function(){
        if (this.props.onClick) {
            this.props.onClick();
        } else {
            Actions.productSelected(this.props.product);
        }
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
                 <ListItem onClick={this.onProductselected}
                              leftAvatar={<Avatar  src={source} />} 
                              primaryText={product.product_name + (product.product_name_2|| "")}                
                              secondaryText={
                                <p>
                                  <span style={{color: Colors.darkBlack}}>made by {product.manufacturer}</span><br/>
                                  
                                </p>
                              }
                              secondaryTextLines={1} />
                            <ListDivider inset={true} />     
                </div>
        );
    }
});

module.exports = Product;
