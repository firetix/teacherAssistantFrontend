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
var Login = require('./components/Login.jsx');
var Register = require('./components/Signup.jsx');
var HomePage = require('./views/home.jsx');
var ProductsPage = require('./views/productsPage.jsx');
var TrippsPage = require('./views/trippsPage.jsx');
var TrippPage = require('./views/trippPage.jsx');
var ProductPage = require('./views/productPage.jsx');
var AddTripp = require('./components/AddTripp.jsx');
var AddNote = require('./components/AddNote.jsx');
var AddPhoto = require('./components/AddPhoto.jsx');
var AddHowHigh = require('./components/AddHowHigh.jsx');
var DemographicQuestions = require('./components/DemographicQuestions.jsx');
var RecurrentQuestions = require('./components/RecurrentQuestions.jsx');
var TrippStore = require('./stores/trippStore.jsx');
var  mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton = mui.RaisedButton;

var Auth = require('j-toker');
var cx = require('classnames');

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
        Reflux.listenTo(Actions.hideModal, 'hideModal'),
        Reflux.listenTo(Actions.goToTripp, 'goToTripp'),
        Reflux.listenTo(Actions.transitionHome, 'transitionHome'),
        Reflux.listenTo(Actions.transitionTripps, 'transitionTripps'),
        Reflux.listenTo(Actions.submitTripp.completed, 'onSuccess')
    ],
    getInitialState: function() {
        var initState = {
            
            showModal: false,
            modalType: 'login'
        };
        initState.user =SessionStore.getUser().user
        return initState;
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
    },
    componentDidMount: function () {
        $('.navbar-nav').on('click', function(){ 
            if($('.navbar-header .navbar-toggle').css('display') !='none'){
                $(".navbar-header .navbar-toggle").trigger( "click" );
            }
        });  
    },
    render : function () {
        var user = this.state.user;
        var menu;
        var addNote;
        var rootUrl = "#";
        var wrapperCx = cx('wrapper', 'full-height', {
            'modal-open': this.state.showModal
        });sp

        var modalTypes = {
            'login'   : <Login/>,
            'selectProduct'   : <ProductsPage/>,
            'register': 
            <Register/>,
            'addTripp': <AddTripp {...this.state}{ ...this.props } tripp={this.state.params}/>,
            'addNote':   (<AddNote {...this.state}{ ...this.props } tripp={this.state.params} />),
            'addPhoto':   (<AddPhoto {...this.state}{ ...this.props } tripp={this.state.params} />),
            'addHowHigh':   (<AddHowHigh {...this.state}{ ...this.props } tripp={this.state.params} />),
            'demographicQuestions':  <DemographicQuestions {...this.state}{ ...this.props } tripp={this.state.params}/>,
            'recurrentQuestions':  <RecurrentQuestions {...this.state}{ ...this.props } tripp={this.state.params}/>
        };
        var modalType = modalTypes[this.state.modalType];   
        if (this.state.user && this.state.user.signedIn) {
            rootUrl = "#tripps/1";
            menu = (
                <ul className="nav navbar-nav">
                    <li >
                        <a onClick={Actions.logout}>Logout</a>
                    </li>
                    <li>
                    <a className="newpost-toggle" onClick={ Actions.showModal.bind(this, 'addTripp') }>
                        <i className="fa fa-plus-square-o"></i>
                        <span className="sr-only">New Post</span>
                    </a>
                    </li>
                </ul>
            )
        } else {
            menu = (
                <ul className="nav navbar-nav">
                    <li >
                        <a onClick={ Actions.showModal.bind(this, 'login') } >Login</a>
                        
                    </li>
                    <li >
                        <a onClick={ Actions.showModal.bind(this, 'register') }>Register</a>
                      </li>
                </ul>
            )
        }

        return (
            <div className={ wrapperCx }>
                <div>
                    <nav className="navbar navbar-default" role="navigation">
                        <div className="navbar-header">
                            <button className="navbar-toggle" data-target="#navbar-collapse-01" data-toggle="collapse" type="button">
                                <span className="sr-only">Toggle navigation</span>
                            </button>
                            <a className="navbar-brand" href={rootUrl}>Spoonfull</a>
                        </div>
                        <div className="collapse navbar-collapse navbar-right" id="navbar-collapse-01">
                            { menu}
                        </div>
                    </nav>
                </div>
                <div className="container" id="main_content">
                    <RouteHandler { ...this.props } user={ this.state.user }/>
                </div>
                <aside className="md-modal">
                    { modalType }
                </aside>
                <a className="md-mask" href="#" onClick={ this.hideModal }></a>
            </div>
        );
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
        <Route name="products" path="/products/:pageNum" handler={ ProductsPage } ignoreScrollBehavior />    
        <Route name="product" path="/product/:productId" handler={ProductPage }/>  
        <Route name="tripps" path="/tripps/:pageNum" handler={ TrippsPage } ignoreScrollBehavior/>
        <Route name="tripp" path="/tripp/:trippId" handler={ TrippPage } ignoreScrollBehavior/>
        <NotFoundRoute handler={UhOh} />
        <DefaultRoute handler={ HomePage } name="home"/>    
    </Route>
);

Router.run(routes, function (Handler, state) {
    React.render(<Handler params={ state.params }/>, document.getElementById('app'));
});

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
