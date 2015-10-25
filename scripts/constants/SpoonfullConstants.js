var CDNRoot = "http://media.spoonfull.io.s3.amazonaws.com";
//developement
var FirebaseRoot = "https://spoonfull.firebaseio.com/";
var APICore = "http://localhost:3000";
 // var APICore = "http://33734d18.ngrok.com";




//// PRODUCTION /////// 
// var APICore = "http://calm-shelf-9337.herokuapp.com";
// var FirebaseRoot = "https://luminous-fire-7725.firebaseio.com/";






var APIRoot = APICore+"/api/v1";
// var AuthRoot = "http://localhost:3000/api/v1";
var AuthRoot = APICore+"/api/v1";


module.exports = {

    APIEndpoints: {

        USER: APIRoot + "/users",
        STORIES: APIRoot + "/stories",
        PRODUCTS: APIRoot + "/products",
        RECOMMENDATIONS: APIRoot + "/recommendations",
        REVIEWS: APIRoot + "/reviews",
        WishList: APICore + "/wish_list",
        CDNRoot:CDNRoot,
        APIRoot:APIRoot,
        AuthRoot:AuthRoot,
        APICore:APICore

    },
     FirebaseRoot:FirebaseRoot

};
