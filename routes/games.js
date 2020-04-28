const express = require('express');
const router =  new express.Router();
const {Game} = require('./../models/game');

router.post('/', async(req, res) => {

    // String given in the search field
    const search_for_game = req.body.search_for;

    // game selected in the filter
    const game = req.body.game;

    // Find the games according to the filter and search
    let games;
    if(game == "All"){
        games = await Game.find({name: new RegExp(req.body.search_for, 'i'),  show: true});
    }
    else{
        games = await Game.find({ type: req.body.game, name: new RegExp(req.body.search_for, 'i'),  show: true});
    }
    
    // If the user is not logged-in
    if(!req.logged){
        // Not an admin
        res.locals.isAdmin = false;
    }
    // User is logged-in
    else{
        // Check if user isAdmin
        if(req.user.isAdmin){
            // Send to view that isAdmin is true
            res.locals.isAdmin = true;
        }
        else{
            // User not an admin
            res.locals.isAdmin = false;
        }

    }
    res.render('games',{games: games});
    
})

module.exports = router;
