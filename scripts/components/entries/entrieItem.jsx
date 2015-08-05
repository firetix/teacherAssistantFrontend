var Reflux = require('reflux');
// actions
var Actions = require('../../actions/Actions');
var moment = require('moment');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  CardTitle = mui.CardTitle,
  CardMedia = mui.CardMedia,
  CardText = mui.CardText,
  Card = mui.Card,
  CardHeader = mui.CardHeader;

  var Router = require('react-router');
// components
var Link = require('react-router').Link;

var Entrie = React.createClass({
  mixins: [
      Router.Navigation,
      Router.State
  ],
      onClick:function(){
          this.transitionTo('entrie',{
            entrieId:this.props.entrie.id
          });
      },
    render:function() {
        var user = this.props.user;
        var entrie = this.props.entrie;
        var product = entrie.product;
        var source;
        if(product.file_name){
          source = "http://media.spoonfull.io.s3.amazonaws.com/photos/" + product.file_name + ".jpg"
        }else if(product.file_name_2){
          source = product.file_name_2
        }
        return (
            <div style={{maxWidth:'400px'}}>
                <Card onClick={this.onClick}>
                   <CardMedia>
                     <img src={source} className="product_image"/>
                   </CardMedia>
                   <CardText>
                              <b>{product.product_name}</b><br/>
                              {entrie.ailement || entrie.activity}<br/>
                              {moment(entrie.time).fromNow()}<br/>
                    </CardText>
                 </Card>
                 <br/>
                 <br/>
                 </div>
        );
    }
});

module.exports = Entrie;
