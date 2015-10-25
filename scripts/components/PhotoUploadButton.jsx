var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var Spinner = require('components/common/spinner.jsx');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  Tab = mui.Tab,
  TextField = mui.TextField,
  Tabs = mui.Tabs,
  Snackbar = mui.Snackbar,
  RaisedButton = mui.RaisedButton,
  FontIcon = mui.FontIcon,
  DatePicker = mui.DatePicker,
  Paper = mui.Paper,
  Avatar = mui.Avatar;
var PhotoUploadButton = React.createClass({
    getInitialState: function () {
        return {
            image_url:null,
            uploading_photo:false 
        };
    },
    mixins: [
        Reflux.listenTo(Actions.addPhotoUI, 'addPhotoUI')
    ],
    addPhotoUI:function(e){
        // e.preventDefault();
        var entrie = this.props.entrie;
        var captionTextEl = this.refs.captionTextEl.getDOMNode();

        var media = {
            entrieId: entrie.id,
            caption: captionTextEl.value.trim(),
            photo_url:this.full_image_url,
            type:"photo",
            creator: this.props.user.full_name,
            creatorUID: this.props.user.uid,
            time: Date.now()
        };
        Actions.addMedia(media);
        captionTextEl.value = '';
        this.setState({
            image_url:null
        });
        Actions.hideModal();
    },
        onChange: function(obj) {
        var file;
        this.setState({
             uploading_photo:true
         });

        file = obj.target.files[0];
        $(React.findDOMNode(this.refs.photo_upload_progress)).show();
        this.uploadFile(file);
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
    setProgress:function(progress, str,file){
        $(".progress .bar").css("width", progress + "%");
        $("#product-upload-progress .text").text(str);
        if (progress === 100) {
          this.onUploadComplete(file);
        }
    },
    onUploadComplete: function(file) {
        var _this =this;
        var reader = new FileReader();

        reader.onloadend = function() {
            _this.setState({
                image_url :reader.result,
                uploading_photo:false
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        this.setState({
            image_url_full: SpoonfullConstants.APIEndpoints.CDNRoot + "/user_uploads/"+ this.props.user.id + "/"+file.name    
        });
        this.props.onUploadCompleted(this.full_image_url);
        this.setState({
             uploading_photo:false
         });
    },
    render:function() {
        var photoUploadButton;
        if(this.state.uploading_photo){
            photoUploadButton =(<Spinner/>);
        }else{
            photoUploadButton =(   <div className="uploader_action_container" style={{width:'93px',height:'40px',overflow:'hidden',position:'relative'}}>
               <RaisedButton  secondary={true}   style={{width:'100%',height:'100%'}}>
                                 <FontIcon   className="fa fa-camera action_icon"/>
                               </RaisedButton>
                <input name="t1" type="file" accept="image/*" onChange={this.onChange} capture="camera"/>
            </div>);
        }
        return (
            <div className="text-center">
                    {photoUploadButton}
            </div>
        );
    }
});

module.exports = PhotoUploadButton;
