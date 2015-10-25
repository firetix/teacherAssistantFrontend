var Reflux = require('reflux');
var React = require('react');
var Actions = require('../actions/Actions');
var _ = require('underscore');
var ExerciceStore = require('../stores/exercices.jsx');
var StudentsStore = require('../stores/studentsStore.jsx');

var Spinner = require('../components/common/spinner.jsx');

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
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }   

var Products = React.createClass({

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(ExerciceStore, 'onExerciceUpdate'),
        LoginRedirection,
        React.addons.LinkedStateMixin
    ],
    getInitialState: function() {
   var studentsData = StudentsStore.getDefaultData();
   return {
       loading: true,
       students: studentsData.students,
       sortOptions: studentsData.sortOptions,
       nextPage: studentsData.nextPage,
       currentPage: studentsData.currentPage,
       perPage: studentsData.perPage,
       exercices: []
   };
    },
    statics: {
        willTransitionTo: function(transition, params) {
                Actions.listenToExercices({
            currentPage: ( 1),
            perPage: this.perPage,
        });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToExercices();
        }
    },
    onExerciceUpdate: function(homeworkData) {
      this.setState({
         exercices:homeworkData.exercie
      });
    },
    render: function() {
      var exercices = this.state.exercices;
      exercices = _.map(exercices,function(homework) {
          var name = "filled-in-box" + homework.id;
              // var href = "#homework/" + homework.id;
            return (   <a className="collection-item avatar">
                        <i className="material-icons circle green">assignment</i>
                        <span className="quiz-title">{homework.title}</span>
                        <p className="flow-text right" > {getRandomInt(1,30)}min </p>
                      </a>)
          
        });
           return ( 
                <div >
                  <div className="navbar-fixed">
                    <nav className="orange darken-2" role="navigation">
                      <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
                        <ul className="right hide-on-med-and-down">
                        </ul>
                      </div>
                    </nav>
                  </div> 
                  <div className="row">
                    <ul className="collection col m3 offset-m1">
                      {exercices}
                    </ul>
                    <div className="col m7">
                      <ul className="collection with-header">
                        <li className="collection-header team teal white-text center">
                          <h4 >Which of these is a cat?</h4>
                        </li>
                          <a href="#!" className="collection-item">a. Lorem ipsum dolor sit amet</a>
                          <a href="#!" className="collection-item">b. Dolor odio placerat</a>
                          <a href="#!" className="collection-item">c. Aenean aenean odio a vestibulum possimus</a>
                          <a href="#!" className="collection-item">d. Velit erat pellentesque id nullam</a>
                      </ul>
                      <div className="row center">
                        <div className="col m4">
                          <img src="http://placehold.it/300x300"/>
                        </div>
                        <div className="col m4">
                          <img src="http://placehold.it/300x300"/>
                        </div>
                        <div className="col m4">
                          <img src="http://placehold.it/300x300"/>
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