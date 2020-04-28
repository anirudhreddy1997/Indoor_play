const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {Game, validateGame}  = require('../models/game');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage })


router.post('/:id', upload.single('gameImage'), async(req,res) => {
//   console.log('create game called');
  
  const {error} = validateGame(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }
  let game = await Game.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description
  });
  res.redirect('/');
})

module.exports = router;