var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  IconButton = mui.IconButton,
  FontIcon = mui.FontIcon,
  Paper = mui.Paper,
    styles = mui.Styles,
  Dialog = mui.Dialog,
  RaisedButton = mui.RaisedButton;

var AddProduct = React.createClass({

    addProduct:function(e){
        e.preventDefault();

        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        var productTextEl = this.refs.productTextEl.getDOMNode();

        var product = {
            trippId: this.props.params.trippId,
            trippTitle: this.props.tripp.title,
            text: productTextEl.value.trim(),
            type:"note",
            creator: this.props.user.full_name,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addProduct(product);
        productTextEl.value = '';
        Actions.hideModal();
    },
    uploadFile:function(file){
        var _this = this;
        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        $.getJSON(SpoonfullConstants.APIEndpoints.APICore+"/s3/sign?filename=" + file.name.replace(/ /g,"_") + "&content_type=" + file.type+"&user_id="+this.props.user.id, function(data) {
          _this.uploadToS3(file, data.put_url, data.content_type);
            _this.full_image_url = data.file_url;
        })
    },
    uploadToS3: function(file, url, content_type) {
        var _this = this;
        var xhr = this.createCORSRequest('PUT', url);
        if (!xhr) {
            this.setProgress(0, 'CORS not supported');
        } else {
            xhr.onload = function() {
                if (xhr.status == 200) {
                    _this.setProgress(100, 'Upload completed.',file);
                } else {
                    _this.setProgress(0, 'Upload error: ' + xhr.status);
                }
            };

            xhr.onerror = function() {
                _this.setProgress(0, 'XHR error.');
            };

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentLoaded = Math.round((e.loaded / e.total) * 100);
                    _this.setProgress(percentLoaded, percentLoaded == 100 ? 'Finalizing.' : 'Uploading.',file);
                }
            };

            xhr.setRequestHeader('Content-Type', content_type);
            //xhr.setRequestHeader('x-amz-acl', 'public-read');
            xhr.send(file);
        }
    },
    createCORSRequest: function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    },
    onFontclick:function(){
debugger;
    },
    render:function() {
        return (
            <div>
                   <input type="file" id="imageButton" hidden>
            <div className="row text-center" onClick={this.onFontclick}>
              <div className="col-md-3 col-xs-3 col-md-3 ">
                <Paper zDepth={1} rounded={false}>
                <br/>
                <br/>
                 <IconButton tooltip="Add camera" disabled={true}>
                   <FontIcon className="fa fa-camera-retro fa-5x" >
                   </FontIcon>
                 </IconButton>
                <br/>
                <br/>
                <br/>
                </Paper>
              </div>
            </div>
                   	</input>
            <div className="row text-center">
            <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField
                  hintText="product name"
                  floatingLabelText="name"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
                    <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField
                  hintText="brand"
                  floatingLabelText="Brand"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
              <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField
                  hintText="22 e.g"
                  floatingLabelText="thc mg"
                  multiLine={true} />
            </div>
            </div>
            </div>
        );
    }
});

module.exports = AddProduct;
