const express = require('express');
const router =  new express.Router();
const {Game} = require('./../models/game');

router.post('/', async(req, res) => {
    const games = await Game.find({ type: req.body.game});
    res.render('games',{games: games});
    
})

module.exports = router;
