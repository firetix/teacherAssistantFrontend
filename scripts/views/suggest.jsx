// components
var Link = require('react-router').Link;

var uhOh = React.createClass({
    render:function() {
        return (
    <div id="modal1" >
    <div >
      <h4>Recommendations</h4>
     <form action="#">
       <ul className="collection">
          
          <a  className="collection-item">Who vs. Whom Practice Worksheet <p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box2" />
      <label htmlFor="filled-in-box2"></label></p></a>
          <a  className="collection-item">Who vs. Whom Video<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box3" />
      <label htmlFor="filled-in-box3"></label></p></a>
          <a  className="collection-item">Pronouns Quiz<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box4" />
      <label htmlFor="filled-in-box4"></label></p></a>
          <a  className="collection-item">Pronouns Worksheet #2<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box5" />
      <label htmlFor="filled-in-box5"></label></p></a>
          <a  className="collection-item">Pronouns Worksheet #1<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box6" />
      <label htmlFor="filled-in-box6"></label></p></a>
          <a  className="collection-item">Pronouns Notes - Texbook pages 141-145<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box7" />
      <label htmlFor="filled-in-box7"></label></p></a>
          <a  className="collection-item">Intro to Pronouns Video<p className="right" style={{marginTop:  "0px"}}>  <input type="checkbox" className="filled-in" id="filled-in-box8" />
      <label htmlFor="filled-in-box8"></label></p></a>
       </ul> 
  </form>  
    </div>
  </div>
        );
    }
});

module.exports = uhOh;