const express = require('express');
const router =  new express.Router();
const auth = require('./../middleware/auth');
const {Wishlist} = require('./../models/wishlist');

router.get('/', auth, async(req, res) => {
    const user_id = req.user._id;
    const wishlistGames = await Wishlist.findOne({user: user_id},{_id: 0, game: 1 }).populate('game');
    if(wishlistGames){
        res.render('wishlistItems',{wishlistGames: wishlistGames.game});
    }
    else{
        res.send("<p>No wishlist Items</p>");
    }

})
module.exports = router;