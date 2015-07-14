var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
// components
var Link = require('react-router').Link;

var AddPhoto = React.createClass({
    getInitialState: function () {
        return {
            image_url:null  
        };
    },
    addPhoto:function(e){
        e.preventDefault();

        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        var captionTextEl = this.refs.captionTextEl.getDOMNode();

        var media = {
            trippId: this.props.params.trippId,
            trippTitle: this.props.tripp.title,
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
        componentDidMount: function () {
        $(".filestyle").filestyle({input: false,buttonText: "Add photo"});
    },
    componentWillUpdate: function (nextProps, nextState) {
          $(".filestyle").filestyle({input: false,buttonText: "Add photo"});
    },
    onUploadComplete: function(file) {
        var _this =this;
        var reader = new FileReader();

        reader.onloadend = function() {
            _this.setState({
                image_url :reader.result,
                uploading_photo:true
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        this.setState({
            did_start_trip: false,
            uploading_photo: false,
            adding_note: false,
             image_url_full: SpoonfullConstants.APIEndpoints.CDNRoot + "/user_uploads/"+ this.props.user.id + "/"+file.name    
        });
    },
    render:function() {
        var imageRender;
        if(this.state.image_url){
           $(".filestyle").filestyle('destroy');
            imageRender = (      <div className="row text-center">
                <div className="col-xs-4">
                    <img id="detail-icon-img" src={this.state.image_url} alt="note, paper icon" width="70" height="70"></img>
                </div>
                <div className="col-xs-8">
                     <textarea placeholder="Add caption" ref="captionTextEl" className="comment-input full-width"></textarea>
                     <button type="submit" className="button button-primary" onClick={this.addPhoto}>Save</button>
                </div>
                        
            </div>)
        }else{
            imageRender = (<input onChange={this.onChange} type="file" className="filestyle" data-input="false"></input>)
        }
        return (
            <div>                  
                  {imageRender}
                  </div>
        );
    }
});

module.exports = AddPhoto;
