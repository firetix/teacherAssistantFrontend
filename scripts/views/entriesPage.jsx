var Reflux = require('reflux');
var _ = require('underscore');
var Actions = require('../actions/Actions');

var EntriesStore = require('../stores/entriesStore.jsx');

var Spinner = require('../components/common/Spinner.jsx');
var EntrieItem = require('../components/entries/entrieItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Entries = React.createClass({

    mixins: [
        Router.Navigation,
        Reflux.listenTo(EntriesStore, 'onStoreUpdate'),
           LoginRedirection
    ],
    getInitialState: function() {
        var entriesData = EntriesStore.getDefaultData();
        return {
            loading: true,
            entries: entriesData.entries,
            sortOptions: entriesData.sortOptions,
            nextPage: entriesData.nextPage,
            currentPage: entriesData.currentPage,
            perPage: entriesData.perPage
        };
    },
    statics: {
        willTransitionTo: function(transition, params) {
            Actions.listenToEntries({
                currentPage: (+params.pageNum || 1),
                perPage: this.perPage,
            });
        },
        willTransitionFrom: function() {
            Actions.stopListeningToEntries();
        }
    },

    onStoreUpdate: function(entriesData) {
        this.setState({
            loading: false,
            entries: entriesData.entries,
            sortOptions: entriesData.sortOptions,
            nextPage: entriesData.nextPage,
            currentPage: entriesData.currentPage,
            perPage: entriesData.perPage
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
    //         Actions.stopListeningToEntries();
    //         Actions.listenToEntries(currentPage);
    //     } else {
    //         this.transitionTo('entries', { pageNum: 1 });
    //     }
    // },

    render: function() {
        var entries = this.state.entries;
        var currentPage = this.state.currentPage || 1;
        var user = this.props.user;
        entries = _.map(entries,function(entrie) {
              return <EntrieItem entrie={ entrie } user={ user } key={ entrie.id } />;
          });
        return ( < div className = "content full-width" >
            < div className = "entries" >

            {entries}

                        < /div >
            < nav className = "pagination" > < /nav>
            </div >
        );
    }

});

module.exports = Entries;