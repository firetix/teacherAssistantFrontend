var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');

function getStateFromStores() {
    return {
        user: SessionStore.getUser()
    };
}
var Header = React.createClass({
    propTypes: {
        email: ReactPropTypes.string
    },
    componentDidMount: function() {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        console.log(getStateFromStores())
        this.setState(getStateFromStores());
    },

    logout: function(e) {
        e.preventDefault();
        SessionActionCreators.logout();
    },
    render: function() {
        console.log(this.props.user);
        var rightNav = this.props.user.signedIn ? ( < ul className = "right" >
            < li className = "has-dropdown" >
            < a href = "#" > {
                this.props.user.email
            } < /a>
          <ul className="dropdown">
            <li><Link to="products">Products</Link > < /li>        
            <li  ><a onClick={this.logout}>Logout</a > < /li>
          </ul >
            < /li> 
      </ul >
        ) : ( < ul className = "right" >
            < li > < Link to = "login" > Login < /Link></li >
            < /ul>
    );

    return (
        <div class="contain-to-grid sticky">
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#"><strong>S</strong > < /a></h1 >
            < /li>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span > < /a></li >
            < /ul>

        <section className="top-bar-section">
          {rightNav}
        </section >
            < /nav>
                        </div >
        );
    }
});

module.exports = Header;