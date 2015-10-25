// components
var Link = require('react-router').Link;
var uhOh = React.createClass({
render:function() {
return (
<div className="content full-width">
    <div className="navbar-fixed">
        <nav className="orange darken-2" role="navigation">
            <div className="nav-wrapper container">
                <a id="logo-container" href="#" className="brand-logo">Teach-Assist.me</a>
                <ul className="right hide-on-med-and-down">
                    <li><a href="#students">Students</a></li>
                    <li><a href="#exercices">Exercices</a></li>
                    <li><a href="#notifications"  className = "orange darken-3">Support</a></li>
                </ul>
                <ul id="nav-mobile" className="side-nav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
                <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
        </nav>
    </div>
    <div style={{height:"64px"}}></div>
    <div className="row">
        <ul className="collection with-header col m3 offset-m1">
            <li className="collection-header team teal center white-text" style={{width:"110%", marginLeft:"-5%"}}>
            <h4>Questions</h4>
            <p className="right" style={{marginTop:  "-10px"}}> Score</p></li>
            <li className="collection-item avatar">
                <img src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png" alt="" className="circle"/>
                armaiz
                <p>Who vs. Whom Video
                </p>
                <h5 className="secondary-content"> 6 </h5>
            </li>
        </ul>
        <div className="col m7">
                <form action="#">
                    <ul className="collection with-header">
                        <li className="collection-header team teal center white-text" style={{width:"100%", marginLeft:"0%"}}>
                            <h4>Knowledgable Students</h4>
                            <p className="right" style={{marginTop:  "-10px"}}> Assign</p>
                        </li>
                        <li className="collection-item avatar">
                            <img src="img/1.jpg" alt="" className="circle"/>
                            <span className="title">Mohamed Rachidi</span>
                            <h5 className="secondary-content">
                             <input type="checkbox" className="filled-in" id="filled-in-box" />
                                <label htmlFor="filled-in-box"></label> 
                            </h5>
                        </li>
                        <li>
                            <div className="btn waves-effect" style={{width: "100%"}} onclick="  Materialize.toast('Confirmed!', 2000, 'rounded');">Confirm</div>
                        </li>
                    </ul>
                    <div className="card row">
                        <div className="input-field col m10 offset-m1">
                            <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                            <label htmlFor="icon_prefix2">Message</label>
                        </div>
                        <div className="btn waves-effect" style={{width: "100%"}} onclick="  Materialize.toast('Text Messages sent!', 2000, 'rounded');">Send Text</div>
                    </div>
                    </form>
            </div>
            
    </div>
</div>
);
}
});
module.exports = uhOh;