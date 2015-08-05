// components
var Actions = require('../actions/Actions');
var Router = require('react-router');
var Link = Router.Link;


var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  FlatButton = mui.FlatButton,
  Table = mui.Table,
  DropDownMenu = mui.DropDownMenu,
  RaisedButton = mui.RaisedButton,
  Slider = mui.Slider,
  Paper = mui.Paper,
  Dialog = mui.Dialog;

  var SliderUI = require("bootstrap-slider");
      
var AddSensation = React.createClass({
    mixins: [
        Router.Navigation
    ],
    onRightIconButtonClick:function(){
      Actions.goBackDosage();
    },
    getInitialState: function () {
        return {
            cursor:1 ,
            sensation:false,
            intensity:5,
            intensityColor:'green'
        };
    },
    onSmileySelected:function(e){
        this.setState({
            sensation:$(e.target).attr("class"),
            cursor:2
        });
    },
    onAddSensation:function(){
        // e.preventDefault();
        var entrie = this.props.entrie;

        var media = {
            entrieId: entrie.id,
            sensation: this.state.sensation,
            intensity: this.intensity,
            intensityColor: this.intensityColor,
            type:"sensation",
            creator: this.props.user.full_name,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addMedia(media);
    },
    onChangeSmileyColor:function(e, value){
        var color = 'gray'
   
        if( value < 3){
           color = 'blue';
        }else if(  value < 7){
                color= 'green';
        }else if(value < 11){
                color= 'red';         
        }
            $(React.findDOMNode(this.refs.selected_sensation)).css("border-color",color);
            this.intensity = value;
            this.intensityColor = color;
    },
    componentDidUpdate: function (prevProps, prevState) {
      var _this = this;
                this.sliderHowHigh = new SliderUI("#points",{ });  
                this.sliderHowHigh
                    .on('change', function(params){
                      _this.onChangeSmileyColor(null,params.newValue);
                    });
    },
    render:function() {
        var navBar;
      var entrie = this.props.entrie;
        var menu,main_content;
        switch(this.state.cursor){
            case 1:
            main_content= (<div ><mui.AppBar
                title='Spoonfull'
                onLeftIconButtonTouchTap={this.onRightIconButtonClick}
                 iconClassNameLeft="fa fa-chevron-left"    />
              <div >
                  <Paper zDepth={2} className="text-center">

                  <div className="smiley" >
                    <div onClick={this.onSmileySelected} className="smile"></div>
                    <div onClick={this.onSmileySelected} className="sad"></div>
                    <div onClick={this.onSmileySelected} className="cry"></div>
                    <div onClick={this.onSmileySelected} className="wink"></div>
                    <div onClick={this.onSmileySelected} style={{verticalAlign:'top'}} className="sarcastic"></div>
                    <div onClick={this.onSmileySelected} style={{verticalAlign:'top'}} className="indifferent"></div>
                    <div onClick={this.onSmileySelected} className="moustache"></div>
                    <div onClick={this.onSmileySelected} className="oh"></div>
                    <div onClick={this.onSmileySelected} className="mouth_shut"></div>
                    <div onClick={this.onSmileySelected} className="cheek"></div>
                    <div onClick={this.onSmileySelected} className="nap"></div>
                    <div onClick={this.onSmileySelected} className="welcome"></div>
                    <div onClick={this.onSmileySelected} className="undecided"></div>
                    <div onClick={this.onSmileySelected} className="partying"></div>
                    <div onClick={this.onSmileySelected} className="angel"></div>
                    <div onClick={this.onSmileySelected} className="evil"></div>
                    <div onClick={this.onSmileySelected} className="vampire"></div>
                    <div onClick={this.onSmileySelected} className="laugh"></div>
                    <div onClick={this.onSmileySelected} className="tongue_cheek"></div>
                    <div onClick={this.onSmileySelected} className="angry"></div>
                    <div onClick={this.onSmileySelected} className="kissed"></div>
                    <div onClick={this.onSmileySelected} className="heart"></div>
                    <div onClick={this.onSmileySelected} className="smug"></div>
                    <div onClick={this.onSmileySelected} className="sigh"></div>
                    <div onClick={this.onSmileySelected} className="greedy"></div>
                    <div onClick={this.onSmileySelected} className="tongue_tied"></div>
                  </div>
                    
                  </Paper>
                  </div>
              </div>)
            break;
            case 2:
                main_content = ( <div >
                    <mui.AppBar
                                    title='Spoonfull'
                                    onLeftIconButtonTouchTap={this.onRightIconButtonClick}
                                     iconClassNameLeft="fa fa-chevron-left"    />
                  <br/>
                  <br/> 
                  <Paper zDepth={2} className="text-center">
                    <div className="container">
                        <div className="smiley" >
                             <div className={this.state.sensation} ref="selected_sensation" style={{borderColor:this.state.intensityColor}} ></div>
                          </div>
                          
                          <input id="points" type="text" class="span2" data-slider-tooltip="hide" data-slider-min="1" data-slider-max="10" data-slider-step="1" data-slider-value="5" onChange={this.onChangeSmileyColor}/> 

                    </div>
                       <div style={{marginTop:10}}>
                      <RaisedButton style={{width:'100%'}} label="Post" secondary={true} ref="post" onClick={this.onAddSensation}/>
                    </div>
                       </Paper>
                  </div>)
        break;
        }
        return (
            <div >
            {main_content}
            
            </div>
        );
    },
    asds:function(){

    }
});

module.exports = AddSensation;
