var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/Actions');

var StudentsStore = require('../stores/studentsStore.jsx');
var HomeworkStore = require('../stores/homeworks.jsx');

var Spinner = require('../components/common/spinner.jsx');
var StudentItem = require('../components/students/studentItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;
var dataArrayInitial =[
        [1,  100, 100],
        [2,  95, 92],
        [3,  96, 85],
        [4,  94, 84],
        [5,  89, 72],
        [6,  92, 74],
        [7,  96, 85]
      ];
      var dataArrayInitial =[
              [1,  100, 100],
              [2,  95, 92],
              [3,  96, 85],
              [4,  94, 84],
              [5,  89, 72],
              [6,  92, 74],
              [7,  96, 85]
            ];
  function generateRandomArray(){
    return [
              [1,  getRandomInt(10,100), getRandomInt(10,100)],
              [2,  getRandomInt(10,100), getRandomInt(10,100)],
              [3,  getRandomInt(10,100), getRandomInt(10,100)],
              [4,  getRandomInt(10,100), getRandomInt(10,100)],
              [5,  getRandomInt(10,100), getRandomInt(10,100)],
              [6,  getRandomInt(10,100), getRandomInt(10,100)],
              [7,  getRandomInt(10,100), getRandomInt(10,100)]
            ];
  }       
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}   
function drawChart(dataArray) {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day');
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addRows(generateRandomArray());

      var options = {
         colors: ['#1b9e77', '#d95f02', '#7570b3'],
        legend: { position: 'none' },
        chart: {
        },
        animation: {
            startup: true,
            duration: 1000
        },
        hAxis: {
         // title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          //title: 'City'
        }
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }
var Students = React.createClass({

    mixins: [
        Router.Navigation,
        Reflux.listenTo(StudentsStore, 'onStoreUpdate'),
        Reflux.listenTo(HomeworkStore, 'onHomeWorkUpdate'),
           LoginRedirection
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
            homeworks:[]
        };
    },
    statics: {
        willTransitionTo: function(transition, params) {
            Actions.listenToStudents({
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
            Actions.listenToHomeworks({
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToStudents();
        }
    },
    componentDidMount:function() {
              google.setOnLoadCallback(function(){
                drawChart(dataArrayInitial);
              });

    
    },
    onStoreUpdate: function(studentsData) {
        this.setState({
            loading: false,
            students: studentsData.students,
            sortOptions: studentsData.sortOptions,
            nextPage: studentsData.nextPage,
            currentPage: studentsData.currentPage,
            perPage: studentsData.perPage,
            selectedStudent:studentsData.students[0].id
        });

    },
    onHomeWorkUpdate:function(homeworkData){
         this.setState({
            homeworks:homeworkData.homework
         });
         
    },

    // updateSortBy(e) {
    //     e.preventDefault();
    //     var currentPage = this.state.currentPage || 1;
    //     debugger
    //     Actions.setSortBy(this.refs.sortBy.getDOMNode().value);
    //
    //     this.setState({
    //         loading: true
    //     });
    //
    //     if (currentPage === 1) {
    //         Actions.stopListeningToStudents();
    //         Actions.listenToStudents(currentPage);
    //     } else {
    //         this.transitionTo('students', { pageNum: 1 });
    //     }
    // },
    
    onClick:function(studentId){
      this.setState({
        selectedStudent:studentId
      });
        drawChart(dataArrayInitial);
    },
    render: function() {
        var _this =this;
        var students = this.state.students;
        var homeworks = this.state.homeworks;
        var selectedStudent = this.state.selectedStudent;
        var currentPage = this.state.currentPage || 1;
        var firstime =false;
        var user = this.props.user;
        students = _.map(students,function(student) {
            if(selectedStudent == student.id){
              return (<StudentItem  onClick={_this.onClick} student={ student } user={ user } key={ student.id } active={true}/>);
            }else{
              return (<StudentItem onClick={_this.onClick} student={ student } user={ user } key={ student.id } />);

            }
          });
        homeworks = _.map(homeworks,function(homework) {
            if(homework.student_id == selectedStudent){
                var href = "#homework/" + homework.id;
              return <a href={href} className="collection-item">{homework.title}<p className="right" style={{marginTop: " 0px"}}> {homework.due_date}</p></a>
            }
          });
        if(!homeworks){
                homeworks = (<div> No Homework </div>)
        }
        return ( < div  >
                                                  <div className="navbar-fixed"><nav className="orange darken-2" role="navigation">
    <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#students" className = "orange darken-3">Students</a></li>
        <li><a href="#homeworks">Homework</a></li>
        <li><a href="#notifications">Notifications</a></li>
      </ul>

      <ul id="nav-mobile" className="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
  <div style={{height:"64px"}}></div>
  </div>
            < div className = "row" >
            <ul className="collection col m3 offset-m1" style={{backgroundColor:'white'}}>
              <li className="collection-header team teal center white-text" style={{width:"110%", marginLeft:"-5%"}}>
              <h4>Student</h4> 
              <p className="right" style={{marginTop:  "-10px"}}> Score</p>
              </li>
            {students}
            </ul>
            <div className="col m7">
            <ul className="collection with-header card" style={{width:"100%"}}> 
          <li className="collection-header team teal center white-text" style={{width:"100%"}}><h4>Grade Overtime</h4> <p className="right"> Score</p></li>
          <li><div id="linechart_material" style={{width:"99%", height: "auto"}}></div></li><br/>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1" style={{width:"100%"}}>Suggest</a></ul>
          <ul classNameName="collection with-header">
          <li className="collection-header team teal center white-text"><h4>Homework</h4> <p className="right" style={{marginTop:  "-10px"}}> Due Date</p></li>
            {homeworks}
         </ul>   
      </div>

                        < /div >
            
            </div >

            
        );
    }

});

module.exports = Students;