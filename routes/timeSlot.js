const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Game, validateGame} = require('../models/game');
const {TimeSlot} = require('../models/timeSlot');
const {Bookings} = require('../models/bookings');
const moment = require('moment-timezone');
const auth = require('../middleware/auth');

router.get('/:id', async(req, res) => {
    if(req.error){
        res.locals.error = req.error;
        res.redirect("/games");
        return ;
    }
    if(req.user){
    // console.log(req.user);
        res.locals.user = req.user;
    }else if(!req.logged){
        res.locals.msg = "login to book time slot";
        res.redirect("/games");
        return ;

    }
    console.log(req.params);
    const id = req.params.id;
    const booked = await TimeSlot.find({game: id, date: moment(new Date()).format("YYYYMMDD")},{_id: 0, slot: 1});
    let booked_array = [];
    for( x of booked ){
        booked_array.push(x.slot);
    }
    // res.send(booked_array);
    res.render('timeSlot',{id: id, booked: booked_array});
});

router.post('/:id/book', auth, async(req, res) => {
    if(req.error){
        res.locals.error = req.error;
        res.redirect("/games");
        return ;
    }
    if(req.user){
    // console.log(req.user);
        res.locals.user = req.user;
    }else if(!req.logged){
        res.locals.msg = "login to book time slot";
        res.redirect("/games");
        return ;

    }
    const game_id = req.params.id;
    const slot = req.body.exampleRadios;
    console.log(slot);
    const date = moment(new Date()).format("YYYYMMDD");
    const booked = await TimeSlot.find({game: game_id, date: moment(new Date()).format("YYYYMMDD"), slot: slot});
    if(booked.length !== 0){
       console.log("Hello");
       res.send("Slot already booked");
    }
    else{
        let timeSlot = new TimeSlot({
            game: game_id,
            slot: String(slot),
            date: date,
        });
        
        timeSlot = await timeSlot.save();
        const user_id = req.user._id;
        let user_has_bookings = await Bookings.find({user: user_id});
    
        if( user_has_bookings.length != 0){
            user_has_bookings = await Bookings.update({user: user_id}, 
                                    { $addToSet: { bookings: {
                                                                game_id: game_id,
                                                                slot: slot,
                                                                date: new Date()
                                                            } 
                                                } 
                                    },  

                                        ) 
    
        } 
        else{
            let booking = new Bookings({
                user: user_id,
                bookings: [{
                    game_id: game_id,
                    slot: slot,
                    date: new Date()
                }]
            })
            booking = await booking.save();
    
        }
        
        
        res.send("Hello");

    }
    
})

module.exports = router;