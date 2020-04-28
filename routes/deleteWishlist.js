const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Game, validateGame} = require('../models/game');
const {Wishlist}  = require('../models/wishlist');
const auth = require('../middleware/auth');


router.post('/', auth, async(req,res) => {

    // find the game to be deleted from the wishlist
    const game_details = await Game.findOne({name: req.body.game_name},{_id: 1});

    // get the id of the game to be deleted from the wishlist
    const game_id = game_details._id;

    // get the user id from the auth middleware
    const user_id = req.user._id;

    // Update the wishlist document of that user
    const updatedWishlist = await Wishlist.updateOne({user: user_id}, {
        $pull: {
            game: game_id
        }
    });

    // Populate the updatedWishlist with the games collection and render it to wishlistItems template
    const wishlistGames = await Wishlist.findOne({user: user_id},{_id: 0, game: 1 }).populate('game');
    if(wishlistGames){
        res.render('wishlistItems',{wishlistGames: wishlistGames.game});
    }
    else{
        res.send("<p>No wishlist Items</p>");
    }
});
module.exports = router;