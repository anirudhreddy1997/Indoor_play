const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {Game, validateGame}  = require('../models/game');

// upload a file in the images folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage })

router.post('/', upload.single('gameImage'), async(req,res) => {

  const {error} = validateGame(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }
  let game = await Game.findOne({ name: req.body.name, type: req.body.type, description: req.body.description  });
  if(game){
      await Game.update({ name: req.body.name, type: req.body.type, description: req.body.description }, {show : true});
  }
  else{
        game = new Game({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description
    }); 
    game = await game.save();
  }
    
  res.redirect('/');
})

module.exports = router;