const express = require('express');
const router =  new express.Router();
const auth = require('./../middleware/auth');
const {Wishlist} = require('./../models/wishlist');
const {Game} = require('./../models/game');

router.post('/', auth, async(req, res) => {
    const game = await Game.findOne({ name: req.body.game, show: true});
    const game_id = game._id;
    // User id from the auth payload
    const user_id = req.user._id;
    // Check if the user has a wishlist 
    const user_id_wl = await Wishlist.findOne({user: user_id});
    let wishlist;
    let p = false;
    // If already has a wishlist
    if(user_id_wl){
        console.log("User in wishlist")
        // _id in wishlist
        const id_wl = user_id_wl._id;
        // console.log(id_wl);
        // console.log(game_id);
        const present = await Wishlist.find({_id: user_id_wl, game: game_id});
        // console.log(present.length);
        if(present.length){
            p = true;
        }
        else{
            wishlist = await Wishlist.update({_id: id_wl}, 
                { $addToSet: { game: game_id } }    )    
        } 
    }
    else{
        // console.log("New to wishlist");
        wishlist = new Wishlist({
            user: user_id,
            game: [game_id],    
        })
        wishlist = await wishlist.save();
    }
    if(p){
        res.send("Already in wishlist");
    }
    else{
        
        res.send("Added to wishlist");
    }
    
})

module.exports = router;
