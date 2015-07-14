// var Promise = require('bluebird');
var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Auth = require('j-toker');
var defaultUser = {
    user:{
      signedIn:false
    }
};

var SessionStore = Reflux.createStore({

    listenables: Actions,

    init:function() {
        this.user = defaultUser;
    },
    onUpdateAccountCompleted:function(params){
      this.user = Auth.user;
      this.trigger("accountUpdateSuccess",this.user);
    },
    onUpdateAccountFailed:function(errors){
      this.user = defaultUser;
      this.trigger("accountUpdateError",errors,this.user);
    },
    onLoginCompleted:function() {
      this.user = Auth.user
      this.trigger("loginSuccess",this.user);
    },
    onLogoutCompleted: function() {
        this.user = defaultUser;
        this.trigger("logoutComplete", this.user);
    },
    onLogoutFailed: function() {
        this.user = defaultUser;
        this.trigger("logoutComplete", this.user);
    },
    onRegisterCompleted:function(){
      this.user = Auth.user;
      this.trigger("registerSuccess");
    },
    onLoginFailed: function(errors) {
      this.user = defaultUser;
      this.trigger("loginError",errors,this.user);
    },
    onRegisterFailed:function(errors){
       this.user = defaultUser;
      this.trigger("registerError",errors,this.user);
    },
    validated:function(){
      this.user = Auth.user;
      this.trigger("validated",this.user);
    },
    getUser:function() {
        return this.user || Auth.user;
    }
});



module.exports = SessionStore;
