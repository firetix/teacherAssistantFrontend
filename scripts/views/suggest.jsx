


// components
var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;
var ExerciceStore = require('../stores/exercices.jsx');
var StudentsStore = require('../stores/studentsStore.jsx');

var _ = require('underscore');
var uhOh = React.createClass({
  mixins: [
      Reflux.listenTo(Actions.assignExercicesUI, 'assignExercicesUI'),
      Reflux.listenTo(ExerciceStore, 'onExerciceUpdate')
  ],
  assignExercicesUI:function(){
      
     var student = this.props.student;
     var exercices = this.state.exercices;
     var yourArray =[];
     var selectedExercice;
     $("input:checkbox:checked").each(function(){
    
         yourArray.push($(this).val());
         var val = $(this).val();
        _.each(exercices, function(exercice) {
             if (val== exercice.exercicesId) {
                 selectedExercice=exercice;
             }
         });
        var now = new Date();
         var homework = {
             student_id: student.id,
             time: Date.now(),
             due_date:(now.getMonth() + 1) + '/' + now.getDate() + '/' +  now.getFullYear(),
             exercice_id:$(this).val(),
             title:selectedExercice.title
         };
          Actions.addHomework(homework);
     });
     Actions.hideModal();
  },
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
  componentDidMount:function() {
    
        Actions.listenToExercices({
            currentPage: ( 1),
            perPage: this.perPage,
        });
  },
  onExerciceUpdate:function(homeworkData){
       this.setState({
          exercices:homeworkData.exercie
       });

       
  },
    render:function() {
      var exercices = this.state.exercices;
      exercices = _.map(exercices,function(homework) {
          var name = "filled-in-box" + homework.id;
              // var href = "#homework/" + homework.id;
            return (<a  className="collection-item">{homework.title}<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" value={homework.id} id={name}  />
      <label htmlFor={name}></label></p></a>)
          
        });
        return (
    <div id="modal1" >
    <div >
      <h4>Recommendations</h4>
     <form action="#">
       <ul className="collection">
          
          
        {exercices}
       </ul> 
  </form>  
    </div>
  </div>
        );
    }
});

module.exports = uhOh;
