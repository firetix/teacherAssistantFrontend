var Reflux = require('reflux');
var React = require('react');
var Actions = require('../actions/Actions');
var _ = require('underscore');
var HomeworkStore = require('../stores/homeworks.jsx');
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
        Reflux.listenTo(HomeworkStore, 'onHomeWorkUpdate'),
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
       homeworks: []
   };
    },
    statics: {
        willTransitionTo: function(transition, params) {
                Actions.listenToHomeworks({
            currentPage: ( 1),
            perPage: this.perPage,
        });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToExercices();
        }
    },
    onHomeWorkUpdate: function(homeworkData) {
       this.setState({
            homeworks:homeworkData.homework
         });
    },
    render: function() {
      var homeworks = this.state.homeworks;
       var studentId= 2;
      homeworks = _.map(homeworks,function(homework) {
        
          var name = "filled-in-box" + homework.id;
          if(homework.student_id == studentId){
              // var href = "#homework/" + homework.id;
            return (   <a className="collection-item avatar">
                        <i className="material-icons circle green">assignment</i>
                        <span className="quiz-title">{homework.title}</span>
                        <p className="flow-text right" > {getRandomInt(1,30)}min </p>
                      </a>)
          
        }
      });
           return ( 
                <div >
                  <div className="navbar-fixed">
                    <nav className="orange" role="navigation">
                      <div className="nav-wrapper container">
                        <a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
                        <ul className="right hide-on-med-and-down">
                          <li><a href="lessons.html">Sign Out</a></li>
                        </ul>
                      </div>
                    </nav>
                  </div> 
                  <div className="row">
                    <ul className="collection col m3 offset-m1">
                      {homeworks}
                    </ul>
                    <div className="col m7">
                      <ul className="collection with-header">
                        <li className="collection-header team teal white-text center">
                          <h4 >Because King Philip's desire to make Spain the dominant power in sixteenth-century Europe ran counter to Queen Elizabeth's insistence on autonomy for England, ------- was -------,</h4>
                        </li>
                          <a href="#!" className="collection-item">(A) reconciliation . . assured</a>
                          <a href="#!" className="collection-item">(B) warfare . . avoidable</a>
                          <a href="#!" className="collection-item">(C) ruination . . impossible</a>
                          <a href="#!" className="collection-item">(D) conflict . . inevitable</a>
                      </ul>
                      <div className="btn-large waves-effect">Hint</div>
                      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                      <div className="btn-large waves-effect right">Skip</div>
                    </div>
                  </div>
                    <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
          
                  </div> 
      );
    }

});

module.exports = Products;