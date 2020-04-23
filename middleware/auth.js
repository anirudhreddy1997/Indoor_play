const jwt = require('jsonwebtoken');
function auth(req, res, next){
    const token = req.cookies['indplay-jwt-token'];

    //console.log("token:"+token);
    if(!token){
        //No user logged in- redirect to homepage
        next();
    }
    try{
    // return payload
    const payload = jwt.verify(token, 'jwtSecretToken');
    //console.log(payload);
    //store the user id in the request with a user property
    req.user = payload;
    // pass the request to the route handler
    next();
    }
    catch(e){
        req.error = "User not valid. Login again." ;
        next();
    }
    
}
module.exports = auth;