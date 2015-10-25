var Reflux = require('reflux');
var React = require('react');
var Actions = require('../actions/Actions');

var ProductsStore = require('../stores/ProductsStore.react.jsx');


var Spinner = require('../components/common/spinner.jsx');
var Product = require('../components/products/productItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  ListDivider = mui.ListDivider,
  Colors = mui.Styles.Colors,
  Avatar = mui.Avatar,
  List = mui.List,
  Paper = mui.Paper,
  TextField = mui.TextField;


var Products = React.createClass({

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(ProductsStore, 'onStoreUpdate'),
        LoginRedirection,
        React.addons.LinkedStateMixin
    ],
    getInitialState: function() {
        var productsData = ProductsStore.getDefaultData();
        return {
            loading: false,
            products: productsData.products,
            sortOptions: productsData.sortOptions,
            nextPage: productsData.nextPage,
            currentPage: productsData.currentPage,
            perPage: productsData.perPage
        };
    },
    onStoreUpdate: function(productsData) {
        this.setState({
            loading: false,
            products: productsData.products,
            sortOptions: productsData.sortOptions,
            nextPage: productsData.nextPage,
            currentPage: productsData.currentPage,
            perPage:productsData.perPage
        });
    },
    searchTerm:function(){
        Actions.getProducts({   
            currentPage: 1,
            perPage: this.state.perPage,
            searchTerm:this.refs.search.getValue().trim()
        });
    },
    loadFunc:function(){
      if(this.state.loading){
        return;
      }

      this.setState({
        loading:true
      });
      Actions.getProducts({ 
          currentPage: (this.state.currentPage +1 ),
          perPage: this.state.perPage,
          searchTerm:this.refs.search.getValue().trim()
      });
    },
    render: function() {
           return ( 
                <div className="container">
                  <div className="navbar-fixed">
                    <nav className="orange darken-2" role="navigation">
                      <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
                        <ul className="right hide-on-med-and-down">
                          <li><a href="lessons.html">Lessons</a></li>
                          <li><a href="students.html" className = "orange darken-3">Students</a></li>
                          <li><a href="homework.html">Homework</a></li>
                          <li><a href="notifications.html">Notifications</a></li>
                        </ul>
                      </div>
                    </nav>
                  </div> 
                  <div className="row">
                    <ul className="collection col m3 offset-m1">
                      <a className="collection-item avatar" href="worksheetStudent.html">
                        <i className="material-icons circle green">assignment</i>
                        <span className="title">Whom vs. Whom Notes</span>
                        <p className="flow-text right" > 10 Min </p>
                      </a>
                      <a className="collection-item avatar" href="worksheetStudent.html">
                        <i className="material-icons circle light-blue">description</i>
                        <span className="title">Whom vs. Whom Worksheet</span>
                        <p className="flow-text right" > 5 Min </p>
                      </a>
                      <a className="collection-item avatar" href="videoStudent.html">
                        <i className="material-icons circle red">play_arrow</i>
                        <span className="title">4 Roaming Deer - Khan Academy</span>
                        <p className="flow-text right" > 2 Min </p>
                      </a>
                      <a className="collection-item avatar" href="quiz.html">
                        <img src="quiz.jpg" alt="" className="circle"/>
                        <span className="title">Whom vs Who quiz</span>
                        <p className="flow-text right" > 10 Min </p>
                      </a>
                    </ul>
                    <div className="col m7">
                      <ul className="collection with-header">
                        <li className="collection-header team teal white-text center">
                          <h4 >Which of these is a cat?</h4>
                        </li>
                        // <!--           <a href="#!" className="collection-item">a. Lorem ipsum dolor sit amet</a>
                        //   <a href="#!" className="collection-item">b. Dolor odio placerat</a>
                        //   <a href="#!" className="collection-item">c. Aenean aenean odio a vestibulum possimus</a>
                        //   <a href="#!" className="collection-item">d. Velit erat pellentesque id nullam</a> -->
                      </ul>
                      <div className="row center">
                        <div className="col m4">
                          <img src="http://placehold.it/300x300" >
                        </div>
                        <div className="col m4">
                          <img src="http://placehold.it/300x300">
                        </div>
                        <div className="col m4">
                          <img src="http://placehold.it/300x300">
                        </div>
                      </div>
                      <div className="btn-large waves-effect">Hint</div>
                      <div className="btn-large waves-effect right">Skip</div>
                    </div>
                  </div>
                  </div> 
      );
    }

});

module.exports = Products;