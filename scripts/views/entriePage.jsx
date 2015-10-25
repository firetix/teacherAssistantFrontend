var Reflux = require('reflux');
var EntrieStore = require('../stores/entrieStore.jsx');
var ProductStore = require('../stores/ProductStore.jsx');
var Reviews = require('../stores/reviews.jsx');

var Spinner = require('../components/common/spinner.jsx');
var EntrieItem = require('../components/entries/entrieItem.jsx');
// components
var Actions = require('../actions/Actions');
var Link = require('react-router').Link;
var Router = require('react-router');
var Product = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var DemographicQuestions = require('../components/DemographicQuestions.jsx');
var RecurrentQuestions = require('../components/RecurrentQuestions.jsx');
var AddSensation = require('../components/AddSensation.jsx');
var Review = require('../components/reviews/reviewItem.jsx');
var DosageOverview = require('../components/DosageOverview.jsx');
var Media = require('../components/Media.jsx');
var Timer = require('../components/Timer.jsx');
var moment =require('moment');
var _ =require('underscore');
var Timer = require('../components/Timer.jsx');
var Router = require('react-router');
var React = require('react');
var PhotoUploadButton = require('../components/PhotoUploadButton.jsx');
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  Tabs = mui.Tabs,
  Tab = mui.Tab,
  CardTitle = mui.CardTitle,
  ListItem = mui.ListItem,
  List = mui.List,
  CardMedia = mui.CardMedia,
  Card = mui.Card,
  FloatingActionButton = mui.FloatingActionButton,
  TextField = mui.TextField,
  CardHeader = mui.CardHeader,
  IconButton = mui.IconButton,
  IconMenu = mui.IconMenu,
  RaisedButton = mui.RaisedButton,
  FontIcon = mui.FontIcon,
  MenuItem = mui.MenuItem,
  DropDownIcon = mui.DropDownIcon,
  Paper = mui.Paper;

  var MenuItem = require('material-ui/lib/menus/menu-item');
  var MenuDivider = require('material-ui/lib/menus/menu-divider');

  var iconMenuItems = [
    { payload: '1', text: 'Add Photo',onItemTouchTap: this.onAddPhoto },
    { payload: '2', text: 'Add Note',onItemTouchTap: this.onAddNote },
    { payload: '3', text: 'Add Sensation',onItemTouchTap: this.onAddSensation }
  ];





var EntriePage = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(EntrieStore, 'onUpdate'),
        Reflux.listenTo(ProductStore, 'onProductUpdate'),
        Reflux.listenTo(Reviews, 'onReviewUpdate'),
        Reflux.listenTo(Actions.showDosageRecommendation, 'showDosageRecommendation'),
        Reflux.listenTo(Actions.showRecurrentQuestions, 'showRecurrentQuestions'),
        Reflux.listenTo(Actions.showDosageOverview, 'showDosageOverview'),
        Reflux.listenTo(Actions.goBackDosage, 'goBackDosage'),
       LoginRedirection,
       React.addons.LinkedStateMixin
    ],
    onUpdate:function(entrieData){
      if(!this.listenToProducts){
         Actions.listenToProduct(entrieData.entrie.product.id);
         this.listenToProducts = true;
      }
       this.setState({
           entrie: entrieData.entrie,
           medias: entrieData.medias,
           product:entrieData.entrie.product,
           cursor:1,
           show_sensation:false
       });
    },
    onProductUpdate:function(productData){
      this.setState({
        reviews:productData.reviews
      });
    },
    statics: {
        willTransitionTo:function(transition, params) {
            // watch current entrie and medias
            Actions.listenToEntrie(params.entrieId);
        },

        willTransitionFrom:function(transition, component) {
            Actions.stopListeningToEntrie(component.state.entrie.id);
            Actions.stopListeningToProduct(component.state.product.id);
        }
    },
    getInitialState:function() {
        return {
            entrie: false,
            medias: [],
            reviews:[],
            product:false,
            comment:'',
            cursor:1,
            show_sensation:false,
            recommendation:false
        };
    },
    onItemTouchTap: function(e,value) {
        if (value == "addSensation") {
          this.onAddSensation();
        return;
        } 
        Actions.showModal(value,this.state.entrie);
    },
    onAddPhoto: function() {
        analytics.track('Add Photo');
        Actions.showModal('addPhoto',this.state.entrie);
    },
    onAddNote: function() {
      analytics.track('Add Note');
        Actions.showModal('addNote',this.state.entrie);
    },
    onAddReview: function() {
      analytics.track('Add Review');
          // e.preventDefault();
          var entrie = this.state.entrie;

          var review = {
              productId: entrie.product.id,
              text: this.state.comment,
              entrieId:entrie.id,
              creator: this.props.user.full_name,
              creatorUID: this.props.user.uid,
              time: Date.now()
          };
          Actions.addReview(review);
          this.setState({
            comment:''
          })
    },
    onAddSensation: function() {
      analytics.track('Add sensation');
       this.setState({
        show_sensation:true
       });
    },
    // componentWillMount: function () {
    //     // if(this.props.user.signedIn){
    //     //     this.transitionTo('entries',{
    //     //         pageNum:1
    //     //     });
    //     // } 
    //     injectTapEventPlugin();
    // },
    // componentWillUpdate: function (nextProps, nextState) {
    //      injectTapEventPlugin(); 
    // },
    onLeftIconButtonTouchTap:function(){
        Actions.showLeftNav();
        // this.refs.leftNav.toggle();
    },
    onLeftIconButtonTouchTapLoggedin:function(){
        this.transitionTo('entries',{
            pageNum:1
        });
    },
    onShowDosage:function(){
      Actions.showModal('addConsumption',this.state.entrie);
    },
    showDosageRecommendation:function(){
      analytics.track('Show dosage recommendation');
        this.setState({
            cursor: 2
        });
      Actions.hideModal();
    },
    showDosageOverview:function(recommendation){
      analytics.track('Show dosage overview');
        this.setState({
            cursor: 4,
            recommendation:recommendation
        });
    },
    showRecurrentQuestions:function(){
      analytics.track('Show recurrent questions');
      this.setState({
          cursor: 3
      });
    },
    goBackDosage:function(){
      var cursor = this.state.cursor  -1 ;
      if(cursor < 1){
        cursor= 1;
      }
      this.setState({
          cursor: cursor,
          show_sensation:false
      });
    },
    onProductClick:function(){
      this.transitionTo('product',{
        productId:this.state.product.id
      });
    },
    onUploadCompleted:function(photo_url){
      var entrie = this.state.entrie;

      var media = {
          entrieId: entrie.id,
          caption: '',
          photo_url:photo_url,
          type:"photo",
          creator: this.props.user.full_name,
          creatorUID: this.props.user.uid,
          time: Date.now()
      };
      Actions.addMedia(media);
    },
    render:function() {
        var navBar;
        var menu;
        var cursor = this.state.cursor;
        var user = this.props.user;
        var medias = this.state.medias;
        var reviews = this.state.reviews;
        var entrie = this.state.entrie;
        var product,source,productJsx;
        var canEdit = (user.id && user.id == entrie.creatorId);
        var editorJsx;
        if(canEdit){
          editorJsx=(          <Paper zDepth={2} className="text-center">
                               
                               <div style={{display:'inline-block',verticalAlign:'top'}} >
                                <PhotoUploadButton  {...this.state}{ ...this.props } entrie={this.state.params} onUploadCompleted={this.onUploadCompleted}/>
                                </div>
                                <RaisedButton  secondary={true}  style={{verticalAlign:'top',width:'25%',height:'40px',minWidth:'2px !important',borderRadius:0}} onClick={this.onShowDosage}>
                                  <FontIcon  className="fa fa-spoon action_icon"/>
                                </RaisedButton>
                                <RaisedButton  secondary={true} style={{verticalAlign:'top',width:'25%',height:'40px',minWidth:'2px !important',borderRadius:0}} onClick={this.onAddSensation}>
                                  <FontIcon  className="fa fa-tachometer action_icon"/>
                                </RaisedButton>                              
                                <RaisedButton  secondary={true} style={{verticalAlign:'top',width:'25%',height:'40px',minWidth:'2px !important',borderRadius:0}} onClick={this.onAddNote}>
                                  <FontIcon  className="fa fa-pencil-square-o action_icon"/>
                                </RaisedButton>
                               
                            </Paper>)
        }
        if(entrie){
            product = this.state.entrie.product;
            if (product.file_name) {
                source = "http://media.spoonfull.io.s3.amazonaws.com/photos/" + product.file_name + ".jpg";
            } else if (product.file_name_2) {
                source = product.file_name_2;
            }
            productJsx=(
                <Product product={ product } user={ user } key={ product.id } onClick={this.onProductClick} />

                )
        }
        // medias.reverse();
        var mediasJsx = _.map(medias, function(media) {
            return (<Media   media={media} user={user} entrie={entrie} key={ media.id }/>) ;
        });
        var reviewsJsx = _.map(reviews, function(review) {    
               return (<Review   review={review} user={user} key={ review.id }/>)
        });
        if (this.props.user && this.props.user.signedIn) {
            // this.transitionTo('entries',{
            //     PageNum:1
            // });
        var rightButton = (

              <IconMenu style={{marginRight: '30px'}} onChange={this.onItemTouchTap} 
              iconButtonElement={(<IconButton iconClassName="fa fa-plus"/>)}>
      <MenuItem primaryText="Add Note"  value='addNote'/>
      <MenuItem primaryText="Add photo" value="addPhoto"/>
      <MenuItem primaryText="Add Sensation" value="addSensation"/>
    </IconMenu>);
                menu=(      <mui.AppBar
                     title='Spoonfull'
                       iconElementLeft={<IconButton iconClassName="fa fa-chevron-left" disableTouchRipple={true} onClick={this.onLeftIconButtonTouchTapLoggedin}></IconButton>} className="app_bar"/>
                  )
        }else{
            }
            if(this.state.show_sensation){
              main_content= (<AddSensation {...this.state}{ ...this.props } entrie={entrie}/>)
            }else{
            switch(cursor) {
                case 1:
                   main_content = (   
                   <div>  
                                {menu}
                    <div className="sp_main_content">
                    < h5 className = "text-center" >< div  >Started < b >  {moment(entrie.time).calendar()} </ b>
                                < /div></h5>
                                <div className="text-center">
                              {productJsx}
                              </div>
                         <Tabs> 
                           <Tab label="Experience" > 
                            {editorJsx}
                 
                               <div className="container">

                                  {mediasJsx}
                              </div>
                         
                           </Tab> 
                           <Tab label="Reviews" > 
                           <div className="container">
                              <Paper zDepth={2} className="text-center">
                               <TextField
                               valueLink={this.linkState("comment")}
                                  hintText="Describe this experience" multiLine={true}/>
                                    <div className="row container" style={{marginTop:10}}>
                                   <RaisedButton style={{width:'100%'}} label="Submit" secondary={true} ref="submit" onClick={this.onAddReview}/>
                                 </div>
                                  </Paper>
                                     <List>
                                  {reviewsJsx}
                                           </List>
                         </div>  
                           </Tab> 
                         </Tabs>  
                    </div> 
                    </div> )
                    break;
                case 2:
                    main_content = (<DemographicQuestions {...this.state}{ ...this.props } entrie={entrie}/>)
                    break;
                case 3:
                    main_content = (<RecurrentQuestions {...this.state}{ ...this.props } entrie={entrie}/>)
                    break;
                case 4:
                    main_content = (<DosageOverview {...this.state}{ ...this.props } entrie={entrie}/>)                   
                    break;
            }
          }
        return (

            <div >

         
            {main_content}
            
            </div>
        );
    }
});

module.exports = EntriePage;
