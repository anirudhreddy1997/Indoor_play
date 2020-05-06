const express = require('express');
const router =  new express.Router();
const auth = require('./../middleware/auth');
const {Bookings} = require('./../models/bookings');

router.get('/', auth, async(req, res) => {
    console.log("Hello");
    const user_id = req.user._id;
    const myBookings = await Bookings.findOne({user: user_id}, {_id: 0, bookings: 1}).populate('bookings.game_id');
    // console.log(myBookings);
    // for( x of myBookings.bookings){
    //     console.log(x.game_id.name);
    // }
    if(myBookings){
        // res.send(myBookings);
        res.render('myBookings',{myBookings: myBookings.bookings});
    }
    else{
        res.send("<p>NO BOOKINGS YET</p>");
    }

})
module.exports = router;