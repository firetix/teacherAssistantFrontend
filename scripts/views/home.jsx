// components
var Link = require('react-router').Link;

var Home = React.createClass({
    render:function() {
        return (
            <div className="content full-width">
                <h1>{ 'Welcome to Spoonfull Alpha!' }</h1>
            </div>
        );
    }
});

module.exports = Home;
