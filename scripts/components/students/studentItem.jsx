var Reflux = require('reflux');
// actions
var Actions = require('../../actions/Actions');
var moment = require('moment');
// components
var Link = require('react-router').Link;

var Student = React.createClass({

    onClick:function(){
        this.props.onClick(this.props.student.id);
    },
    render:function() {
        var user = this.props.user;
        var student = this.props.student;
        var active = this.props.active;
        var test;
        var className = "collection-item avatar";
        if(active){
            className = "collection-item avatar active"
        }
        return (
                    <li className={className} onClick={this.onClick}>
                        <img src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png" alt="" className="circle"></img>
                        {student.name} 
                        <h5 className="secondary-content"> {student.level} </h5>
                    </li>
                  
            
                
        );
    }
});

module.exports = Student;
