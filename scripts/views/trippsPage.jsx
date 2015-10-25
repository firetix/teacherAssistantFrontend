var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/Actions');

var TrippsStore = require('../stores/trippsStore.jsx');

var Spinner = require('../components/common/Spinner.jsx');
var TrippItem = require('../components/tripps/trippItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Tripps = React.createClass({

    mixins: [
        Router.Navigation,
        Reflux.listenTo(TrippsStore, 'onStoreUpdate'),
           LoginRedirection
    ],
    getInitialState: function() {
        var trippsData = TrippsStore.getDefaultData();
        return {
            loading: true,
            tripps: trippsData.tripps,
            sortOptions: trippsData.sortOptions,
            nextPage: trippsData.nextPage,
            currentPage: trippsData.currentPage,
            perPage: trippsData.perPage
        };
    },
    statics: {
        willTransitionTo: function(transition, params) {
            Actions.listenToTripps({
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToTripps();
        }
    },

    onStoreUpdate: function(trippsData) {
        this.setState({
            loading: false,
            tripps: trippsData.tripps,
            sortOptions: trippsData.sortOptions,
            nextPage: trippsData.nextPage,
            currentPage: trippsData.currentPage,
            perPage: trippsData.perPage
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
    //         Actions.stopListeningToTripps();
    //         Actions.listenToTripps(currentPage);
    //     } else {
    //         this.transitionTo('tripps', { pageNum: 1 });
    //     }
    // },

    render: function() {
        var tripps = this.state.tripps;
        var currentPage = this.state.currentPage || 1;
        var user = this.props.user;
        tripps = _.map(tripps,function(tripp) {
              return <TrippItem tripp={ tripp } user={ user } key={ tripp.id } />;
          });
        return ( < div className = "content full-width" >
            < div className = "tripps" >

            {tripps}

                        < /div >
            < nav className = "pagination" > < /nav>
            </div >
        );
    }

});

module.exports = Tripps;