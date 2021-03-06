window.React = require('react/addons');
var Reflux = require('reflux');

var attachFastClick = require('fastclick');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
// var  = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;

var SessionStore = require('./stores/SessionStore.react.jsx');
var Actions = require('./actions/Actions');
var UhOh = require('./views/404.jsx');
var NotificationsPage = require('./views/notificationsPage.jsx');
var Login = require('./views/Login.jsx');
var Suggest = require('./views/suggest.jsx');
var AddConsumption = require('./components/AddConsumption.jsx');
var Register = require('./components/Signup.jsx');
var HomePage = require('./views/home.jsx');
var Profile = require('./views/profile.jsx');
var ProductsPage = require('./views/productsPage.jsx');
var StudentsHome = require('./views/studentsPage.jsx');
var HomeworksPage = require('./views/homeworksPage.jsx');
var TeachersHome = require('./views/teachersPage.jsx');
var TrippsPage = require('./views/trippsPage.jsx');
var EntriesPage = require('./views/entriesPage.jsx');
var TrippPage = require('./views/trippPage.jsx');
var ProductPage = require('./views/productPage.jsx');
var EntriePage = require('./views/entriePage.jsx');
var AddTripp = require('./components/AddTripp.jsx');
var AddNote = require('./components/AddNote.jsx');
var AddPhoto = require('./components/AddPhoto.jsx');
var AddHowHigh = require('./components/AddHowHigh.jsx');
var DemographicQuestions = require('./components/DemographicQuestions.jsx');
var RecurrentQuestions = require('./components/RecurrentQuestions.jsx');
var TrippStore = require('./stores/trippStore.jsx');
var AddProduct = require('./components/AddProduct.jsx');


var Auth = require('j-toker');
var NewEntrie = require('./components/NewEntrie.jsx');
var cx = require('classnames');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  FlatButton = mui.FlatButton,
  Dialog = mui.Dialog;
 var LeftNav = mui.LeftNav;
 var IconButton = mui.IconButton;
 var FloatingActionButton = mui.FloatingActionButton;
  var MenuItem = mui.MenuItem;


var menuItemsLoggedOut = [
     { route: 'home', text: 'Home', ref:"asdasd" },
  { route: 'login', text: 'Login' },
  { route: 'signup', text: 'Signup' }
];
var menuItemsLoggedIn = [
    { 
     type: MenuItem.Types.LINK, 
     payload: '/#/products', 
     text: 'Profile' 
  },
    { 
     type: MenuItem.Types.LINK, 
     payload: '/#/tripps', 
     text: 'Register' 
  },
];
menuItems2 = [
  { route: 'home', text: 'Home' },
  { route: 'login', text: 'Login' },
  { route: 'signup', text: 'Signup' }
];
function keyUpHandler(e) {
    // esc key closes modal
    if (e.keyCode === 27) {
        e.preventDefault();
        Actions.hideModal();
    }
}

var SpoonfullApp = React.createClass({
    mixins: [
        require('react-router').Navigation,
        Reflux.listenTo(SessionStore, 'onStoreUpdate'),
        Reflux.listenTo(Actions.showModal, 'showModal'),
        Reflux.listenTo(Actions.showLeftNav, 'showLeftNav'),
        Reflux.listenTo(Actions.hideModal, 'hideModal'),
        Reflux.listenTo(Actions.goToTripp, 'goToTripp'),
        Reflux.listenTo(Actions.transitionHome, 'transitionHome'),
        Reflux.listenTo(Actions.transitionTripps, 'transitionTripps'),
        Reflux.listenTo(Actions.submitTripp.completed, 'onSuccess')
    ],
    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext:function() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },
    getInitialState: function() {
        var initState = {
            
            showModal: false,
            modalType: ''
        };
        initState.user =SessionStore.getUser().user
        return initState;
    },
    showLeftNav:function(){
            this.refs.leftNav.toggle();
    },
    goToTripp: function(trippId) {
        this.transitionTo('tripp', {
            trippId: trippId
        });
    },
    transitionHome:function(){
        this.transitionTo('home');
    },
    transitionTripps:function(){
        this.transitionTo('tripps/1');
    },
    hideModal: function(e) {
        if (e) {
            e.preventDefault();
        }
        window.removeEventListener('keyup', keyUpHandler);

        this.setState({
            showModal: false
        });
        this.refs.dialog.dismiss();
    },

    addTrip:function(){
         Actions.showModal('addTripp');
    },
    onStoreUpdate: function(event,user) {
        var state ={
            showModal:false,
            user:user
        };
        if(user && !user.signedIn){
            delete state.showModal;
        }
        this.setState(state);
    },
    onSuccess:function(){
        this.setState({
            showModal: false
        });
    },
        showModal: function(type,params) {
            
        // pressing esc closes modal
        window.addEventListener('keyup', keyUpHandler);
        this.setState({
            modalType: type,
            showModal: true,
            params:params
        });
         this.refs.dialog.show();
    },
    componentDidMount: function () {
        $('.navbar-nav').on('click', function(){ 
            if($('.navbar-header .navbar-toggle').css('display') !='none'){
                $(".navbar-header .navbar-toggle").trigger( "click" );
            }
        });  
    },
    onLeftPanelChange:function(ev,numb,data){
    	this.transitionTo(data.route);
		this.refs.leftNav.close();
    },
    onLeftIconButtonTouchTapLoggedin:function(){
        this.transitionTo('profile')
    },
    onDosageRecomendation:function(){
        Actions.showDosageRecommendation();

    },
    addDosage:function(){
        Actions.addDosageUI();
    },
    assignExercices:function(){
        Actions.assignExercicesUI();
    },
    render : function () {
        var user = this.state.user;
        var menu;
        var addNote;
        var rootUrl = "#";
        var menuItems;
        var wrapperCx = cx('wrapper', 'full-height', {
            'modal-open': this.state.showModal
        });
		var actions = [
		   { text: "Can't find it?", ref: 'add_product',onTouchTap: this.showAddProduct },
		  { text: 'Cancel' }
		];
        var modalTypes = {
            'login'   : <Login/>,
            'suggest'   : <Suggest student={this.state.params}/>,
            'addConsumption'   : <AddConsumption {...this.state}{ ...this.props } entrie={this.state.params}/>,
            'addProduct'   : <AddProduct {...this.state}{ ...this.props } tripp={this.state.params}/>,
            'selectProduct'   : <ProductsPage/>,
            'register': 
            <Register/>,
            'addTripp': <AddTripp {...this.state}{ ...this.props } tripp={this.state.params}/>,
            'addNote':   (<AddNote {...this.state}{ ...this.props } entrie={this.state.params} />),
            'addPhoto':   (<AddPhoto {...this.state}{ ...this.props } entrie={this.state.params} />),
            'addHowHigh':   (<AddHowHigh {...this.state}{ ...this.props } tripp={this.state.params} />),
            'demographicQuestions':  <DemographicQuestions {...this.state}{ ...this.props } tripp={this.state.params}/>,
            'recurrentQuestions':  <RecurrentQuestions {...this.state}{ ...this.props } tripp={this.state.params}/>
        };
        if (this.state.modalType == 'addProduct') {
            actions = [{
                text: "Submit",
                ref: 'add_product',
                onTouchTap: this.addProduct
            }];
        } else if (this.state.modalType == "addConsumption") {
            actions = [ {
                text: "Need Help with dosing?",
                ref: 'needHelp',
                onTouchTap: this.onDosageRecomendation
            },{
                text: "Submit",
                ref: 'addDosage',
                onTouchTap: this.addDosage
            }];
        } else if (this.state.modalType == "addNote") {
            actions = [{
                text: "Submit",
                ref: 'addNoteUI',
                onTouchTap: this.addNoteUI
            }];
        }else if (this.state.modalType == "addPhoto") {
            actions = [{
                text: "Submit",
                ref: 'addPhotoUI',
                onTouchTap: this.addPhotoUI
            }];
        }else if (this.state.modalType == "suggest") {
            actions = [{
                text: "Assign",
                onTouchTap:this.assignExercices
            }];
        }

        var modalType = modalTypes[this.state.modalType];   
        if (this.state.user && this.state.user.signedIn) {
            rootUrl = "#tripps/1";
            menuItems = menuItemsLoggedIn;

        } else {
            menuItems = menuItemsLoggedOut;
            menu = (
             
                <LeftNav ref="leftNav" docked={false} menuItems={menuItemsLoggedOut} onChange={this.onLeftPanelChange} />
        
            )
        }
        // return (
        //     <div className={ wrapperCx }>

        //     <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />
        //         <div>
        //         <AppBar
        //           title="Spoonfull" onLeftIconButtonTouchTap={this.onclick} onRightIconButtonTouchTap={this.onclick} onclick={this.onclick}/>

        //         </div>
        //         <div className="container" id="main_content">
        //             <RouteHandler { ...this.props } user={ this.state.user }/>
        //         </div>
        //         <aside className="md-modal">
        //             { modalType }
        //         </aside>
        //         <a className="md-mask" href="#" onClick={ this.hideModal }></a>
        //     </div>
        // );
		return (
		     <div>
		    {menu}
		         <div >
                     <div >
    		             <RouteHandler { ...this.props } user={ this.state.user } />
                     </div>
		         </div>
		         <Dialog openImmediately={this.state.showModal} contentStyle={{minHeight:'300px'}}   ref="dialog"
		             actions={actions}>
		              { modalType } 
		         </Dialog>
		     </div>
		   );
    },
    _handleCustomDialogSubmit:function(){
        this.refs.dialog.show();
    },
  //   componentWillMount: function () {
		// injectTapEventPlugin();
          
  //   },
    showAddProduct:function(){
    	Actions.showModal('addProduct')
    },
	addProduct:function(){
        Actions.submitAddProduct();
    },
    addPhotoUI:function(){
        Actions.addPhotoUI();
    },  
    addNoteUI:function(){
        Actions.addNoteUI();
    },
    // componentWillUpdate: function (nextProps, nextState) {
    //     debugger;
    //      injectTapEventPlugin(); 
    // },
  onRightIconButtonClick: function(){
    this.transitionTo('new_entrie');
  },
  onLeftIconButtonTouchTap:function(){
  	this.refs.leftNav.toggle();
  }
});




// var SpoonfullApp = require('./components/SpoonfullApp.react.jsx');
// var LoginPage = require('./components/session/LoginPage.react.jsx');
// var ProductsPage = require('./components/products/ProductsPage.react.jsx');

// var HomePage = require('./views/home.jsx');

// var ProductPage = require('./components/products/ProductPage.react.jsx');
// // var ProductNew = require('./components/products/ProductNew.react.jsx');
// var SignupPage = require('./components/session/SignupPage.react.jsx');  var
//DemographicQuestions =
//require('./components/dosage/demographicQuestions.jsx');
// var RecurrentQuestions =
//require('./components/dosage/recurrentQuestions.jsx');
// var DosageOverview = require('./components/dosage/dosageOverview.jsx');

// var TrippsPage = require('./components/tripps/TrippsPage.jsx');
// var addTripPage = require('./components/tripps/addtrippPage.jsx');

// var routes = (
//   <Route name="app" path="/" handler={SpoonfullApp}>
//   	<Route name="login" path="/login" handler={LoginPage}/>
//   	<Route name="signup" path="/signup" handler={SignupPage}/>      <Route
//name="questions" path="/dosage/:productId/questions" handler={
//RecurrentQuestions } />    	<Route name="overview"
//path="/dosage/:productId/overview/:recommendationId" handler={ DosageOverview
//} />      <Route name="product" path="/product/:productId" handler={
//ProductPage }
//>
//     </Route>      <Route name="demographic" path="/signup_2" handler={
//DemographicQuestions }
///>
//     <Route name="products" path="/products/:pageNum" handler={ ProductsPage }
//ignoreScrollBehavior />      <Route name="tripps" path="/tripps/:pageNum"
//handler={ TrippsPage } ignoreScrollBehavior
///>
//   	<Route name="tripp" path="/tripp/new" handler={ addTripPage } />
//     <DefaultRoute name="home" handler={HomePage} />
//   </Route>
// );

// Router.run(routes, function(Handler, state) {      React.render(<Handler
//params={ state.params } />,
//document.getElementById('app'));
// });

var routes = (
    <Route handler={ SpoonfullApp }>
        <Route handler={ UhOh } name="404" path="/404"/>
        <Route name="studentsPage" path="/students" handler={ StudentsHome } ignoreScrollBehavior />    
        <Route name="exercices" path="/exercices" handler={ HomeworksPage } ignoreScrollBehavior />    
        <Route name="notifications" path="/notifications" handler={ NotificationsPage } ignoreScrollBehavior />    
        <Route name="teachersPage" path="/teachers" handler={ TeachersHome } ignoreScrollBehavior />    
        <Route name="product" path="/product/:productId" handler={ProductPage }/>  
        <Route name="entrie" path="/entrie/:entrieId" handler={EntriePage }/>  
        <Route name="login" path="/login" handler={Login }/>  
        <Route name="signup" path="/signup" handler={Register }/>  
        <Route name="profile" path="/profile" handler={Profile }/>  
        <Route name="new_entrie" path="/entrie" handler={NewEntrie }/>  
        <Route name="tripps" path="/tripps/:pageNum" handler={ TrippsPage } ignoreScrollBehavior/>
        <Route name="tripp" path="/tripp/:trippId" handler={ TrippPage } ignoreScrollBehavior/>
        <Route name="entries" path="/entries/:pageNum" handler={ EntriesPage } ignoreScrollBehavior/>
        <NotFoundRoute handler={UhOh} />
        <DefaultRoute handler={ HomePage } name="home"/>    
    </Route>
);

Router.run(routes, function (Handler, state) {
    React.render(<Handler params={ state.params }/>, document.getElementById('app'));
});

// fastclick eliminates 300ms click delay on mobile
// injectTapEventPlugin();
attachFastClick(document.body);



google.load('visualization', '1.1', {packages: ['line']});

