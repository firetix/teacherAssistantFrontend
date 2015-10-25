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
  Card = mui.Card,
  CardText = mui.CardText,
  CardMedia = mui.CardMedia,
  ListItem = mui.ListItem;
var Router = require('react-router');
var CardProduct = React.createClass({
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
                        <Card >
                           <CardMedia>
                             <img src={source}/>
                           </CardMedia>
                           <CardText>
                                      <b>{product.product_name + (product.product_name_2|| "")}</b><br/>
                            </CardText>
                         </Card>
        );
    }
});
module.exports = CardProduct