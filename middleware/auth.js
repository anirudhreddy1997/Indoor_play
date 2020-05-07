const jwt = require('jsonwebtoken');
function auth(req, res, next){
    const token = req.cookies['indplay-jwt-token'];
    const url = req.originalUrl;
    

    // Store the logged information in logged
    if(!token){
        //No user logged in- redirect to homepage
        req.logged = false;
        console.log("user not logged");
        return next();
    }

    try{
    // return payload
    const payload = jwt.verify(token, 'jwtSecretToken');

    //store the user id in the request with a user property
    req.user = payload;
    req.logged = true;
    // pass the request to the route handler
    next();
    }
    catch(e){
        console.log("error in jwt");
        req.error = "User not valid. Login again." ;
        return next();
    }
    
}
module.exports = auth;