var Reflux = require('reflux');
var _ = require('underscore');
var React = require('react');
var Actions = require('../actions/Actions');

var EntriesStore = require('../stores/entriesStore.jsx');

var Spinner = require('../components/common/Spinner.jsx');

var EntrieItem = require('../components/entries/entrieItem.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Router = require('react-router');
var Link = Router.Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  Paper = mui.Paper,
  Tabs = mui.Tabs,
  Tab = mui.Tab,
  IconButton = mui.IconButton,
  Dialog = mui.Dialog,
  RaisedButton = mui.RaisedButton;

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
            perPage: entriesData.perPage,

            personalEntries: entriesData.personalEntries,
            sortOptionsPersonal: entriesData.sortOptionsPersonal,
            nextPagePersonal: entriesData.nextPagePersonal,
            currentPagePersonal: entriesData.currentPagePersonal,
            perPagePersonal: entriesData.perPagePersonal
        };
    },
    // statics: {
    //     willTransitionTo: function(transition, params) {
    //         Actions.listenToEntries({
    //             currentPage: (+params.pageNum || 1),
    //             perPage: this.perPage,
    //         });
    //     },
    //     willTransitionFrom: function() {
    //         Actions.stopListeningToEntries();
    //     }
    // },
    onRightIconButtonClick:function(){
      this.transitionTo('new_entrie');
    },
    onLeftIconButtonTouchTapLogged:function(){
        this.transitionTo('profile');
    },
    onStoreUpdate: function(entriesData) {
        this.setState({
            loading: false,

            entries: entriesData.entries,
            sortOptions: entriesData.sortOptions,
            nextPage: entriesData.nextPage,
            currentPage: entriesData.currentPage,
            perPage: entriesData.perPage,
            
            personalEntries: entriesData.personalEntries,
            sortOptionsPersonal: entriesData.sortOptionsPersonal,
            nextPagePersonal: entriesData.nextPagePersonal,
            currentPagePersonal: entriesData.currentPagePersonal,
            perPagePersonal: entriesData.perPagePersonal
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
    loadFunc:function(){
        Actions.stopListeningToEntries();

        Actions.listenToEntries({
            currentPage: (this.state.currentPage+1),
            perPage: this.state.perPage,
        });
    },
    loadFuncMyEntries:function(){
        // Actions.stopListeningToEntries();
        // debugger;
        Actions.listenToUserEntries({
            currentPage: (this.state.currentPage+1),
            perPage: this.state.perPage,
            creatorId:this.props.user.id
        });
    },
    render: function() {
        var entries = this.state.entries;
        var personalEntries = this.state.personalEntries;
        var currentPage = this.state.currentPage || 1;
        var user = this.props.user;
        entries = _.map(entries,function(entrie) {
              return <EntrieItem entrie={ entrie } user={ user } key={ entrie.id } />;
          });      
        personalEntries = _.map(personalEntries,function(entrie) {
              return <EntrieItem entrie={ entrie } user={ user } key={ entrie.id } />;
          });
        var entrieJsx = (<InfiniteScroll
            pageStart={this.state.currentPage}
            loadMore={this.loadFunc}
            hasMore={this.state.nextPage}
            threshold={5}
            loader={<Spinner />}>
          {entries} 
        </InfiniteScroll>);
        var personalEntrieJsx = (<InfiniteScroll
            pageStart={this.state.currentPagePersonal}
            loadMore={this.loadFuncMyEntries}
            hasMore={this.state.nextPagePersonal}
            threshold={5}
            loader={<Spinner />}>
          {personalEntries} 
        </InfiniteScroll>);
        return ( <div  >
            <mui.AppBar
                     title='Spoonfull'
                     onRightIconButtonTouchTap={this.onRightIconButtonClick}
                      iconElementLeft={<IconButton iconClassName="fa fa-user" disableTouchRipple={true} onClick={this.onLeftIconButtonTouchTapLogged}></IconButton>} 
                     iconClassNameRight="fa fa-pencil-square-o"  className="app_bar"/>

            <div className = "entries sp_main_content" >
            <Tabs> 
              <Tab label="Me" > 
                {personalEntrieJsx}
              </Tab > 
              <Tab label="Everyone" > 
                {entrieJsx}
              </Tab > 
            </Tabs> 


                        </div >
            
            </div >
        );
    }

});

module.exports = Entries;