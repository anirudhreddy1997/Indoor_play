const mongoose  = require('mongoose');

const BookingsSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookings:[
        {
            game_id:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Games',
            },
            slot:{
                type: String
            },
            date: {
                type: Date
            }
        
    }]
});

const Bookings = mongoose.model('Bookings', BookingsSchema);

exports.Bookings = Bookings;