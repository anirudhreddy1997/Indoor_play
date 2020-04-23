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
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).send('Invalid user or password');
    }
    // return bool 
    const validPassword = bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
        return res.status(400).send('Invalid username or password')
    }

    // Send the JSW token
    const token = user.generateAuthToken();
    res.cookie('indplay-jwt-token', token, {httpOnly: true, maxAge: 1000000}).redirect('/');
})
function validateAuth(user){
    // const complexityOptions = {
    //     min: 5,
    //     max: 255,
    //     upperCase: 1,
    //     numeric: 1,
    //     symbol: 1,
    //     requirementCount: 4 
    // };
    const schema = {
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}
module.exports = router;