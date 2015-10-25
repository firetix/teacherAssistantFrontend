var Reflux = require('reflux');
// actions
var Actions = require('../actions/Actions');
var ProductsPage = require('../views/productsPage.jsx');
var Product = require('./products/productItem.jsx');
var ProductsPage = require('../views/productsPage.jsx');
var React = require('react');
var Router = require('react-router');
// components
var Link = require('react-router').Link;
// var injectTapEventPlugin = require("react-tap-event-plugin");
var   mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  AppBar = mui.AppBar,
  TextField = mui.TextField,
  Paper = mui.Paper,
  Dialog = mui.Dialog,
  FlatButton = mui.FlatButton,
  IconButton = mui.IconButton,
  RaisedButton = mui.RaisedButton;

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var ailements = 
  ["Ailments",
  "Acquired Hypothyroidism",
  "Acute Gastritis",
  "Agoraphobia",
  "AIDS Related Illness",
  "Alcohol Abuse",
  "Alcoholism",
  "Alopecia Areata",
  "Alzheimer's Disease",
  "Amphetamine Dependency",
  "Amyloidosis",
  "Amyotrophic Lateral Sclerosis (ALS)",
  "Angina Pectoris ",
  "Ankylosis",
  "Anorexia",
  "Anorexia Nervosa",
  "Anxiety Disorders",
  "Any chronic medical symptom that limits major life activities ",
  "Any Chronic Medical Symptom that Limits Major Life Activities",
  "Arachnoiditis",
  "Arnold-Chiari Malformation",
  "Arteriosclerotic Heart Disease",
  "Arthritis",
  "Arthritis (Rheumatoid)",
  "Arthropathy, gout",
  "Asthma ",
  "Attention Deficit Hyperactivity Disorder (ADD/ADHD)",
  "Auditory Neuropathy",
  "Autism/Aspergers",
  "Autoimmune Disease",
  "Autonomic Neuropathy",
  "Back Pain",
  "Back Sprain ",
  "Bell's Palsy",
  "Bipolar Disorder",
  "Brain Tumor, Malignant",
  "Bruxism",
  "Bulimia",
  "Cachexia",
  "Cancer",
  "Cancer, Adrenal Cortical",
  "Cancer, Endometrial",
  "Cancer, Prostate",
  "Cancer, Testicular",
  "Cancer, Uterine",
  "Carpal Tunnel Syndrome",
  "Causalgia",
  "Cerebral Palsy",
  "Cervical Disk Disease",
  "Cervicobrachial Syndrome",
  "Chemotherapy",
  "Chemotherapy Induced Anorexia",
  "Chronic Fatigue Syndrome",
  "Chronic Inflammatory Demyelinating Polyneuropathy",
  "Chronic Migraine",
  "Chronic Pain",
  "Chronic Pancreatitis",
  "Chronic renal failure",
  "Cocaine Dependence",
  "Colitis",
  "Conjunctivitis",
  "Constipation",
  "Cranial Neuropathy",
  "Crohn's Disease",
  "CRPS (Complex Regional Pain Syndrome Type II)",
  "Cystic Fibrosis ",
  "Damage to Spinal Cord Nervous Tissue ",
  "Darier's Disease",
  "Degenerative Arthritis",
  "Degenerative Arthropathy",
  "Delirium Tremens",
  "Dermatomyositis",
  "Diabetes, Adult Onset",
  "Diabetes, Insulin Dependent",
  "Diabetic Neuropathy",
  "Diabetic Peripheral Vascular Disease",
  "Diarrhea",
  "Diverticulitis",
  "Dysthymic Disorder",
  "Dystonia",
  "Eczema",
  "Elevated Intraocular Pressure",
  "Emphysema",
  "Emphysema",
  "Endometriosis",
  "Epidermolysis Bullosa ",
  "Epididymitis",
  "Epilepsy",
  "Felty's Syndrome",
  "Fibromyalgia",
  "Fibrous Dysplasia",
  "Focal Neuropathy",
  "Friedreich's Ataxia",
  "Gastritis",
  "Genital Herpes",
  "Glaucoma",
  "Glioblastoma Multiforme",
  "Graves Disease",
  "Headaches, Cluster",
  "Headaches, Tension",
  "Hemophilia A",
  "Henoch-Schonlein Purpura",
  "Hepatitis C ",
  "Hereditary Spinal Ataxia",
  "HIV/AIDS",
  "Hospice Patients",
  "Huntington's Disease",
  "Hydromyelia",
  "Hypertension",
  "Hypertension",
  "Hyperventilation",
  "Hypoglycemia",
  "Hyrdocephalus",
  "Impotence",
  "Inflammatory autoimmune-mediated arthritis",
  "Inflammatory Bowel Disease (IBD)",
  "Insomnia",
  "Intermittent Explosive Disorder (IED)",
  "Interstitial Cystitis",
  "Intractable Pain",
  "Intractable Vomitting",
  "Irritable Bowel Syndrome",
  "Irritable Bowl Syndrome",
  "Lipomatosis",
  "Lou Gehrig's Disease",
  "Lupus",
  "Lyme Disease",
  "Lymphoma",
  "Major Depression",
  "Malignant Melanoma",
  "Mania",
  "Melorheostosis",
  "Meniere's Disease",
  "Mitochondrial disease",
  "Motion Sickness",
  "Mucopolysaccharidosis (MPS)",
  "Multiple Sclerosis (MS)",
  "Muscle Spasms",
  "Muscular Dystrophy",
  "Myasthenia Gravis",
  "Myeloid Leukemia",
  "Nail-Patella Syndrome",
  "Neurofibromatosis",
  "Nightmares",
  "Obesity",
  "Obsessive Compulsive Disorder",
  "Opiate Dependence",
  "Optic Neuropathy",
  "Osteoarthritis",
  "Panic Disorder",
  "Parkinson's Disease",
  "Peripheral Neuropathy",
  "Peritoneal Pain",
  "Persistent Insomnia",
  "Porphyria",
  "Post Concussion Syndrome",
  "Post Polio Syndrome (PPS)",
  "Post-traumatic arthritis",
  "Post-Traumatic Stress Disorder (PTSD)",
  "Premenstrual Syndrome (PMS)",
  "Prostatitis",
  "Psoriasis",
  "Pulmonary Fibrosis",
  "Quadriplegia",
  "Radiation Therapy",
  "Raynaud's Disease",
  "Reflex Sympathetic Dystrophy",
  "Reiter's Syndrome",
  "Residual Limb Pain",
  "Restless Legs Syndrome (RLS)",
  "Rheumatoid Arthritis",
  "Rheumatoid Arthritis",
  "Rheumatoid Arthritis",
  "Rosacea",
  "RSD (Complex Regional Pain Syndrome Type 1)",
  "Schizoaffective Disorder",
  "Schizophrenia",
  "Scoliosis ",
  "Sedative Dependence",
  "Seizures",
  "Senile Dementia",
  "Severe Nausea",
  "Severe Pain",
  "Severe Vomiting",
  "Shingles (Herpes Zoster)",
  "Sickle cell disease",
  "Sinusitis",
  "Sjoren's Syndrome",
  "Skeletal Muscular Spasticity",
  "Sleep Apnea",
  "Sleep Disorders",
  "Spasticity",
  "Spinal Cord Injury",
  "Spinal Stenosis",
  "Spinocerebellar Ataxia",
  "Sturge-Weber Syndrome (SWS)",
  "Stuttering",
  "Syringomyelia",
  "Tardive Dyskinesia (TD)",
  "Tarlov Cysts",
  "Temporomandibular joint disorder (TMJ)",
  "Tenosynovitis",
  "Terminal Illness",
  "Thyroiditis",
  "Tic Douloureux",
  "Tietze's Syndrome ",
  "Tinnitus",
  "Tobacco Dependence",
  "Tourette's Syndrome",
  "Traumatic Brain Injury",
  "Trichotillomania",
  "Viral Hepatitis",
  "Wasting Syndrome",
  "Whiplash ",
  "Wittmaack-Ekbom's Syndrome",
  "Writers' Cramp"];

var NewEntrie = React.createClass({
    mixins: [
    Router.Navigation,
    Router.State,
          React.addons.LinkedStateMixin,
          Reflux.listenTo(Actions.productSelected, 'productSelected'),
          Reflux.listenTo(Actions.submitEntrie.completed, 'onSuccess'),
          Reflux.listenTo(Actions.submitEntrie.failed, 'onError')
    ],
    getInitialState: function() {
      return { ailement:'',activity:'',product:{},showProducts:false };
    },
    onAddProduct:function(e){
            // this.refs.dialog.show();
            // Actions.showModal('selectProduct');
            this.setState({
             showProducts:true
            });
    },
    onSuccess:function(entrieId){
    	this.transitionTo('entrie',{
        entrieId:entrieId
      });
    },
    onError:function(){

    },
    onCreateEntrie:function(e){
    		e.preventDefault();

    		var user = this.props.user;

    		var tripp = {
    		    product_name: this.state.product.product_name,
    		    creatorId: user.id,
    		    // profileImage:this.full_image_url,
    		    creatorEmail: user.uid,
    		    creatorName: user.full_name,
    		    time: Date.now(),
    		    product:this.state.product,
    		    productId:this.state.product.id,
    		    ailement:this.state.ailement,
    		    activity:this.state.activity
    		};
    		this.setState({
    		    image_url:null
    		});
    		Actions.submitEntrie(tripp);
    },
    productSelected:function(product){
    	this.setState({
    		product:product
    	});
    	//create action to update entries
    	 // Actions.hideModal();
       this.setState({
        showProducts:false
       });
    },
    onLeftIconButtonClick:function(){
      this.transitionTo('products',{
        pageNum:1
      });
    },    
    onRightIconButtonClick:function(){
     Actions.showModal('addProduct')
    },

    componentDidMount: function () {
          $('.typeahead').typeahead({
            hint: false,
            highlight: true,
            minLength: 1
          },
          {
            name: 'Ailements',
            source: substringMatcher(ailements)
          });
            $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
                console.log('Selection: ' + suggestion);
                this.setState({
                  ailement:suggestion
                });
            }.bind(this));

    },
    componentDidUpdate: function (prevProps, prevState) {
          if(prevState.showProducts && !this.state.showProducts){
          	$('.typeahead').typeahead({
          	  hint: false,
          	  highlight: true,
          	  minLength: 1
          	},
          	{
          	  name: 'Ailements',
          	  source: substringMatcher(ailements)
          	});
          }else  if(!prevState.showProducts && this.state.showProducts){
          			$('.typeahead').typeahead('destroy');
          }
    },
    onAilementChange:function(ev){
    	console.log(React.findDOMNode(ev.currentTarget).value);
      this.setState({
        ailement:React.findDOMNode(ev.currentTarget).value.trim()
      });
    },
    render:function() {
      var main_content;
    	var productJsx = (<RaisedButton label="Add product" secondary={true} onClick={this.onAddProduct} />)
    	if(this.state.product.id){
    		productJsx= (<div><Product onClick={this.onAddProduct} product={ this.state.product } user={ this.props.user } key={ this.state.product.id } /><br/><br/><RaisedButton label="Save" secondary={true} onClick={this.onCreateEntrie} /></div>)
    	}
      if(this.state.showProducts){
        main_content = (<ProductsPage/>)
      }else{
        main_content= (<form className='comment-form' onSubmit={ this.addEntrie }>
                 <br/>
                 <Paper zDepth={2} className="text-center">
                    
                        <TextField
                        valueLink={this.linkState("activity")}
                          floatingLabelText="Activity">
                        </TextField>
                     
                    <p>or</p>
                        <TextField
                        
                        >                                                                        
                            <input  ref="ailement" className="typeahead" type="text" placeholder="Ailement" value={this.state.ailement} onChange={this.onAilementChange}/>                        
                        </TextField>
                   
                     
                     <br/>
                     <br/>
                </Paper>
                 <br/>
                  <br/>
                    <div className="form-group text-center">
                      {productJsx}
                     </div>
                </form>)
      }
        return (
            <div>
                 <mui.AppBar
                     title='Spoonfull'     
                     onRightIconButtonTouchTap={this.onRightIconButtonClick}
                      iconElementLeft={<IconButton iconClassName="fa fa-chevron-left" disableTouchRipple={true} onClick={this.onLeftIconButtonClick}></IconButton>}    className="app_bar" />
                     <div className="sp_main_content">
                  {main_content}
                </div>  
                </div>
        );
    }
});

module.exports = NewEntrie;
