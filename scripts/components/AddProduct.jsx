var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var SpoonfullConstants = require('../constants/SpoonfullConstants.js');
var ProductStore = require('../stores/ProductStore.jsx');
// components
var Link = require('react-router').Link;
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  IconButton = mui.IconButton,
  FontIcon = mui.FontIcon,
  Paper = mui.Paper,
  CircularProgress = mui.CircularProgress,
    styles = mui.Styles,
  Dialog = mui.Dialog,
  DropDownMenu = mui.DropDownMenu,
  RaisedButton = mui.RaisedButton;
  var menuItems = [
     { payload: 'edible', text: 'Edible' },
     { payload: 'tincture', text: 'Tincture' },
     { payload: 'capsule', text: 'Capsule' }
  ];

var AddProduct = React.createClass({
	getInitialState: function () {
	    return {
	        loading_photo:false  
	    };
	},
	mixins: [
	    Reflux.listenTo(Actions.submitAddProduct, 'onAddProduct'),
	    Reflux.listenTo(Actions.productCreated, 'productCreated'),
	    React.addons.LinkedStateMixin
	],
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
    productCreated:function(product){
    	Actions.productSelected(product.product);
    },
    uploadFile:function(file){
        var _this = this;
        // if (!this.props.user.signedIn) {
        //     Actions.showModal('login');
        //     return;
        // }
        $.getJSON(SpoonfullConstants.APIEndpoints.APICore+"/s3/sign_image?filename=" + file.name.replace(/ /g,"_") + "&content_type=" + file.type+"&user_id="+this.props.user.id, function(data) {
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
    onUploadFile:function(obj){
    	var file;

    	file = obj.target.files[0];
    	$(React.findDOMNode(this.refs.photo_upload_progress)).show();
    	this.uploadFile(file);
    	this.setState({
    		loading_photo:true
    	})
    },
    setProgress:function(progress, str,file){
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
                loading_photo: false
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        this.setState({
            image_url_full: SpoonfullConstants.APIEndpoints.CDNRoot + "/photos/"+ this.props.user.id + "/"+file.name    
        });
    },
    onAddProduct:function(e){
	    // e.preventDefault();

	    // if (!this.props.user.signedIn) {
	    //     Actions.showModal('login');
	    //     return;
	    // }
	    // var captionTextEl = this.refs.captionTextEl.getDOMNode();

	    var product = {
	    	        "product_name": this.state.product_name,
	    	        "manufacturer": this.state.manufacturer,
	    	        "flavor": this.state.flavor,
	    	      	"type_strain": this.state.type_strain,
	    	        "thc": this.state.thc,
	    	        "file_name_2":this.full_image_url,
	    	        "creator": this.props.user.full_name,
	    	        "creatorId": this.props.user.id,
                    "extract_type":this.state.extractType
	    };
	    Actions.createProduct(product);
	    this.setState({
	        image_url:null
	    });
	    Actions.hideModal();
    },
    onExtractTypeChange:function(e, selectedIndex, menuItem){
      this.setState({
        extractType:menuItem.payload
      });
    },
    render:function() {
    	var photoLoader;
    	if(this.state.loading_photo){
    			photoLoader = (<CircularProgress mode="indeterminate" />)
    	}
    	if(this.state.image_url){
    		$(".filestyle").filestyle('destroy');
    	    imageRender = (	            <div className="row text-center" >
              <div className="col-md-3 col-xs-3 col-md-3 ">
               	   <input hidden={true} style={{display:'none'}} onChange={this.onUploadFile} type="file"  data-buttonClass="btn-primary" className="filestyle " data-input="false"></input>
              </div>
              <div className="col-xs-4">
                  <img id="detail-icon-img" src={this.state.image_url} alt="note, paper icon" width="70" height="70"></img>
              </div>
               	   {photoLoader}
            </div>)
    	}else{
    	    imageRender = ( <div className="row text-center" >
              <div className="col-md-3 col-xs-3 col-md-3 ">
               	   <input onChange={this.onUploadFile} type="file" data-buttonClass="btn-primary" className="filestyle " data-input="false"></input>
              </div>
              {photoLoader}
                </div>
				)
    	}
        return (
            <div>
            {imageRender}
            <div className="row text-center">
            <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField   valueLink={this.linkState("product_name")}
                  hintText="product name"
                  floatingLabelText="name"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
                    <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField   valueLink={this.linkState("manufacturer")}
                  hintText="brand"
                  floatingLabelText="Brand"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
              <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField   valueLink={this.linkState("thc")}
                  hintText="220 e.g"
                  floatingLabelText="thc  in mg"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
              <div className="col-md-3 col-xs-3 col-md-3 ">
                <TextField   valueLink={this.linkState("type_strain")}
                  hintText="Sativa e.g"
                  floatingLabelText="type_strain"
                  multiLine={true} />
            </div>
            </div>
            <div className="row text-center">
              <div className="col-md-3 col-xs-3 col-md-3 ">                
                <DropDownMenu menuItems={menuItems} onChange={this.onExtractTypeChange}/>
            </div>
            </div>

            </div>
        );
    }
});

module.exports = AddProduct;
