var APICore = "http://calm-shelf-9337.herokuapp.com";
var APIRoot = APICore+"/api/v1";
// var APIRoot = "http://localhost:3000/api/v1";
var CDNRoot = "http://media.spoonfull.io.s3.amazonaws.com";
// var AuthRoot = "http://localhost:3000/api/v1";
var AuthRoot = APICore+"/api/v1";
module.exports = {

    APIEndpoints: {

        USER: APIRoot + "/users",
        STORIES: APIRoot + "/stories",
        PRODUCTS: APIRoot + "/products",
        RECOMMENDATIONS: APIRoot + "/recommendations",
        REVIEWS: APIRoot + "/reviews",
        CDNRoot:CDNRoot,
        APIRoot:APIRoot,
        AuthRoot:AuthRoot,
        APICore:APICore
    }

};
