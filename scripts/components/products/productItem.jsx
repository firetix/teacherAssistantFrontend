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
var Router = require('react-router');

var Product = React.createClass({
  mixins: [
      Router.Navigation,
      Router.State
      ],
    propTypes: {
        user: React.PropTypes.object,
        product: React.PropTypes.object
    },
    onProductselected:function(){
        if (this.props.onClick) {
            this.props.onClick(this.props.product);
        } else if(this.props.triggerSelection){
            Actions.productSelected(this.props.product);
        }else{
          this.transitionTo('product',{
            productId:this.props.product.id
          })
        }
    },
    render:function() {
        var user = this.props.user;
        var product = this.props.product;
        var source = "";
        var chevron;
        if(product.file_name){
          source = "http://media.spoonfull.io.s3.amazonaws.com/photos/" + product.file_name + ".jpg"
        }else if(product.file_name_2){
          source = product.file_name_2
        }
        if(!this.props.hideChevron){
          chevron=( <i className="fa fa-chevron-right"></i>)
        }

        if(this.props.showDelete){
          chevron=( <i className="fa fa-trash-o fa-2x"></i>)
        }

        return ( 

      <div className="row text-center" style={{backgroundColor: Colors.white}} onClick={this.onProductselected}>
                        <div className="col-xs-4">
                            <img id="detail-icon-img" src={source} alt="note, paper icon" width="95" height="95"></img>
                        </div>
                        <div className="col-xs-6">
                              <br/>
                               <b>{product.product_name + (product.product_name_2|| "")}</b><br/>
                               made by {product.manufacturer}
                        </div>
                         <div className="col-xs-2">
                         <br/>
                         <br/>
                          {chevron}
                         </div>       
                    </div>
        );
    }
});

module.exports = Product;
