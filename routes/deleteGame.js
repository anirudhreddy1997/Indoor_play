const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Game, validateGame}  = require('../models/game');


router.post('/', async(req,res) => {
  // user is the admin
  res.locals.isAdmin = true;
  // find the game to be deleted
  console.log(req.body.game_name);
  let game = await Game.findOne({ name: req.body.game_name });
  if(!game){
      return
  }
  // set the game show to false
  
  game.set({show: false});
  game = await game.save();
  const games = await Game.find({ show: true});
  
  res.render('games',{games: games});
})

module.exports = router;