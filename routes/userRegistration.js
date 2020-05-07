const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {User, validateUser}  = require('../models/user');

router.post('/', async(req,res) => {
  // console.log(req.body);
  const {error} = validateUser(req.body);
  if(error){
      // console.log('Error 1');
      return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if(user){
      // console.log('Error 2');
      res.locals.msg= 'Already registered user';
      return res.status(400).redirect("/");
  }
 user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  }); 
  // console.log('No Error');
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  user = await user.save();
  const token = user.generateAuthToken();
  res.cookie('indplay-jwt-token', token,{ httpOnly: true, maxAge: 3600000 }).redirect('/');
})

module.exports = router;