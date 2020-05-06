const jwt = require('jsonwebtoken');
function auth(req, res, next){
    const token = req.cookies['indplay-jwt-token'];

    // Store the logged information in logged
    if(!token){
        //No user logged in- redirect to homepage
        req.logged = false;
        next();
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
        req.error = "User not valid. Login again." ;
        next();
    }
    
}
module.exports = auth;