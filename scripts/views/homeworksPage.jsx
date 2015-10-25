var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/Actions');

var StudentsStore = require('../stores/studentsStore.jsx');
var ExerciceStore = require('../stores/exercices.jsx');

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
        Reflux.listenTo(ExerciceStore, 'onExerciceUpdate'),
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
            exercices:[]
        };
    },
    statics: {
        willTransitionTo: function(transition, params) {
            // Actions.listenToStudents({
            //     currentPage: (+params.pageNum || 1),
            //     perPage: this.perPage,
            // });
            Actions.listenToExercices({
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToExercices();
        }
    },
    componentDidMount:function() {
      
              // google.setOnLoadCallback(function(){
              //   drawChart(dataArrayInitial);
              // });

    
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
    onExerciceUpdate:function(homeworkData){
         this.setState({
            exercices:homeworkData.exercie
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
        var exercices = this.state.exercices;
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
        exercices = _.map(exercices,function(homework) {
          
                var href = "#homework/" + homework.id;
              return <a href={href} className="collection-item">{homework.title}<p className="right" style={{marginTop: " 0px"}}> {homework.due_date}</p></a>
            
          });
        if(!exercices){
                exercices = (<div> No Exercices </div>)
        }
        return ( < div  >
                                <div className="navbar-fixed">
            <div className="navbar-fixed"><nav className="orange darken-2" role="navigation">
    <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#students" >Students</a></li>
        <li><a className="orange darken-3" href="#exercices">Exercices</a></li>
        <li><a href="#">Notifications</a></li>
      </ul>

      <ul id="nav-mobile" className="side-nav" style={{left: "-250px"}}>
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
  </div>
          </div>
            < div className = "row" style={{maxWidth:'1072px'}} >
            
            <div className="card" id="linechart_material" style={{width:"100%", height: "auto"}}></div>
          <ul className="collection with-header">
          <li className="collection-header team teal center white-text"><h4>Exercices</h4> </li>
            {exercices}
         </ul>   
      

                        < /div >
            
            </div >
        );
    }

});

module.exports = Students;