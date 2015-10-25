var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var TrippStore = require('../stores/trippStore.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var TrippComponent = require('../components/tripps/trippItem.jsx');

var Spinner = require('./common/spinner.jsx');

// components
var Router = require('react-router');
var Link = Router.Link;

var Tripp = React.createClass({

    propTypes: {
        user: React.PropTypes.object
    },

    mixins: [
        Router.Navigation,
        Router.State,
        Reflux.listenTo(Actions.submitTripp.completed, 'onSuccess'),
        Reflux.listenTo(Actions.submitTripp.failed, 'onError')
    ],
    getInitialState: function () {
        return {
            image_url:null  
        };
    },
    componentDidMount: function() {
        React.findDOMNode(this.refs.title).focus();
        $(".filestyle").filestyle({input: false,buttonText: "Add photo"});
    },

    componentWillUpdate: function() {
        React.findDOMNode(this.refs.title).focus();
    },
    resetForm:function() {
        this.setState({
            submitted: false
        });
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.submit).disabled = false;
    },
    onError:function(errorCode) {
        React.findDOMNode(this.refs.submit).disabled = false;

        console.log(errorCode);

        this.setState({
            errorMessage: 'Something went wrong.',
            submitted: false
        });
    },
        onChange: function(obj) {
        var file;

        file = obj.target.files[0];
        this.uploadFile(file);
    },
    uploadFile:function(file){
        var _this = this;
        if (!this.props.user.signedIn) {
            Actions.showModal('login');
            return;
        }
        $.getJSON(SpoonfullConstants.APIEndpoints.APIRoot +"/s3/sign?filename=" + file.name.replace(/ /g,"_") + "&content_type=" + file.type+"&user_id="+this.props.user.id, function(data) {
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
                image_url :reader.result
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        this.setState({
             image_url_full: SpoonfullConstants.APIEndpoints.APICore + "/user_uploads/"+ this.props.user.id + "/"+file.name    
        });
    },
    onSuccess:function(id) {
        React.findDOMNode(this.refs.title).value = '';
        this.transitionTo('tripp', {
            trippId: id
        });
    },
    onSubmit:function(e){
        e.preventDefault();

        var trippTitle = React.findDOMNode(this.refs.title);

        var user = SessionStore.getUser();

        var tripp = {
            title: trippTitle.value.trim(),
            creatorId: user.id,
            // profileImage:this.full_image_url,
            creatorEmail: user.uid,
            creatorName: user.full_name,
            time: Date.now()
        };
        this.setState({
            image_url:null
        });
        Actions.submitTripp(tripp);
    },
    render: function() {
        var imageRender;
        if(this.state.image_url){
           $(".filestyle").filestyle('destroy');
            imageRender = (  <div className="form-group">
                  <label className="control-label" htmlFor="trippTitleInput">Tripp Profile Image</label>
                    {imageRender}
                    <div className="row text-center">
                <div className="col-xs-4">
                    <img id="detail-icon-img" src={this.state.image_url} alt="note, paper icon" width="70" height="70"></img>
                </div>
            </div>
            </div> )
        }
        return (
          <div>
            <h4>create your tripp</h4>
            <form role="form" onSubmit={this.onSubmit }>
                <div className="form-group">
                  <label className="control-label" htmlFor="trippTitleInput">Title</label>
                  <input className="form-control" id="trippTitleInput" placeholder="Enter title"  ref="title" />
                </div>  
                {imageRender}
                <button type="submit" className="btn btn-primary" ref="submit">Submit</button>
            </form>
      </div>
        );
    }
});

module.exports = Tripp;
