const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Adult, validateAdult}  = require('../models/adult');

// Find all the games in the adult collection

router.get('/', async(req, res, next) => {
    const game = await Adult.find({}, {_id: 0});
    console.log(game);
    res.render('adults', {games: game});
})

module.exports = router;