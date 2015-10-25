var Reflux = require('reflux');
var TrippStore = require('../stores/trippStore.jsx');
var Actions = require('../actions/Actions');
var Spinner = require('../components/common/spinner.jsx');
var Tripp = require('../components/Tripp.jsx');
var Media = require('../components/Media.jsx');
var LoginRedirection = require('../components/mixins/LoginRedirection.jsx');
var Product = require('../components/products/productItem.jsx');
var Timer = require('../components/Timer.jsx');
var moment =require('moment');
var _ =require('underscore');
var Router = require('react-router');


var TrippPage = React.createClass({

    propTypes: {
        user: React.PropTypes.object,
        params: React.PropTypes.object
    },

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(TrippStore, 'onUpdate'),
           LoginRedirection,
           Reflux.listenTo(Actions.productSelected, 'productSelected'),
    ],

    statics: {
        willTransitionTo:function(transition, params) {
            // watch current tripp and medias
            Actions.listenToTripp(params.trippId);
        },

        willTransitionFrom:function(transition, component) {
            Actions.stopListeningToTripp(component.state.tripp.id);
        }
    },

    getInitialState:function() {
        return {
            tripp: false,
            medias: [],
            products:[],
            loading: true
        };
    },

    onUpdate:function(trippData) {
        this.setState({
            tripp: trippData.tripp,
            medias: trippData.medias,
            products:trippData.products,
            loading: false
        });
    },
    productSelected:function(product){
        Actions.hideModal();
        var products = this.state.products;
        products.push(product);
        this.setState({
            products : products
        });
        Actions.addTrippProduct(product);
    },

    addMedia:function(e) {
        e.preventDefault();

        if (!this.props.user.isLoggedIn) {
            Actions.showModal('login');
            return;
        }

        var trippTextEl = this.refs.trippText.getDOMNode();
        var tripp = {
            trippId: this.props.params.trippId,
            trippTitle: this.state.tripp.title,
            text: trippTextEl.value.trim(),
            creator: this.props.user.profile.username,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addMedia(tripp);
        trippTextEl.value = '';
    },
    onChange: function(obj) {
        debugger;
    },
    onAddNote: function() {
        Actions.showModal('addNote',this.state.tripp);
    },
    onHowHigh: function() {
        Actions.showModal('addHowHigh',this.state.tripp);
    },
    onAddPhoto: function() {
        Actions.showModal('addPhoto',this.state.tripp);
    },
    onCameDown:function(){
        var tripp = this.state.tripp;
        tripp.end_time = Date.now();
        Actions.updateTripp(tripp);
    },
    onTagProduct:function(){
        Actions.showModal('selectProduct');
    },
    render:function() {
        var user = this.props.user;
        var medias = this.state.medias;
        var products = this.state.products;
         console.log(products)
        products = _.map(products,function(product) {
              return <Product product={ product } user={ user } key={ product.id } />;
          });
        var tripp = this.state.tripp;
        var trippId = this.getParams();
        var timer,stopButton;
        var medias = (<h3> No Events Yet</h3>)
        var shouldHide ="btn btn-success btn-lg hidden";
        var shouldHideStopButton = "btn btn-circle btn-danger btn-lg hidden";
        if(tripp && user && tripp.creatorId == user.id){
            shouldHide = "btn btn-success btn-lg";
            shouldHideStopButton = "btn btn-circle btn-danger btn-lg";
        }
        if(tripp.end_time){
            shouldHide = "btn btn-success btn-lg hidden";
            shouldHideStopButton = "btn btn-circle btn-danger btn-lg hidden";            
        }
        if(tripp.end_time){
            timer = (< h5 className = "text-center" >< div  >started < b >  {moment(tripp.time).calendar()} </ b>
                      ended < b>  {moment(tripp.end_time).calendar()} < /b>
            < /div></h5>)
        }else if(tripp.time){
             timer = (< div className="text-center" >< h5 className = "text-center" > This tripp started  <b>{moment(tripp.time).fromNow()}</b> < /h5>
                      
            < /div>)
        }else{
            timer = (<div></div>)
        }
        stopButton = (<div></div>)
        if(!tripp.end_time && tripp.time){
            stopButton = ( < div className="text-center" ><br/><br/> <button className={shouldHideStopButton} onClick={this.onCameDown}>Not high anymore</button >< /div>)
        }
        var medias = _.map(this.state.medias, function(media) {
            return (<Media   media={media} user={user} tripp={tripp} key={ media.id }/>) ;
        });
        var content;

        if (this.state.loading) {
            content = <Spinner />;
        // } else if (tripp.isDeleted) {
        //     this.replaceWith('404');
        } else {
            // medias = medias.map(function(tripp) {
            //     return <Media tripp={ tripp } user={ user } key={ tripp.id } />;
            // });
            // content = (
            //     <div>
            //         <Tripp tripp={ tripp } user={ user } key={ trippId } />
            //         <div className="medias">
            //             <h2>{ medias.length }</h2>
            //             { medias }
            //         </div>
            //     </div>
            // );
        }

        return (
            <div className="content full-width">
            {timer}
            <br/>
            <div className="row">
                <div className="col-xs-4">
                 <button className={shouldHide} onClick={this.onAddNote}>Add Note</button >
               </div>
               <div className="col-xs-4">
                   <button className={shouldHide} onClick={this.onAddPhoto}>Add Photo</button >
               </div>
                <div className="col-xs-4">
                     <button className={shouldHide} onClick={this.onHowHigh}>How high are u?</button >
               </div>
            </div>
             <br/>
                <br/>
                <div className="text-center">
                    <button className="btn btn-success btn-lg" onClick={this.onTagProduct}>Tag Product</button >

                    {products}
              </div>
                { content }
                <br/>
                <br/>
                <h2> Events:</h2>
                {medias}
                <br/>
                <br/>
                {stopButton}
            </div>
        );
    }

});

module.exports = TrippPage;
