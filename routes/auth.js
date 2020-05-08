const express = require('express');
const bcrypt = require('bcrypt');
const router =  new express.Router();
const mongoose = require('mongoose');
const Joi = require('Joi');
const {User}  = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', async(req,res) => {
    const {error} = validateAuth(req.body);
    if(error){
        res.send(error.details[0].message);
        return;
    }
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        res.send('Invalid username or password');
        return;
    }
    // return bool 
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.send('Invalid username or password');
        return;
    }
    console.log("user");
    // Send the JSW token
    const token = user.generateAuthToken();
    res.cookie('indplay-jwt-token', token, {httpOnly: true, maxAge: 1000000}).redirect('/');
})
function validateAuth(user){
    const schema = {
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}
module.exports = router;