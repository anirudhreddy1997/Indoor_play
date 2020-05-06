const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Game, validateGame}  = require('../models/game');


router.get('/:id', async(req,res) => {
  // user is the admin
  res.locals.isAdmin = true;
  const game_id = req.params.id;
  // find the game to be deleted
  // console.log(req.body.game_name);
  let game = await Game.findOne({ _id: game_id });
  if(!game){
      return
  }
  // set the game show to false
  
  game.set({show: false});
  game = await game.save();
  const games = await Game.find({ show: true});
  console.log(games); 
  // res.send(games);
  res.redirect('/');
})

module.exports = router;