const mongoose  = require('mongoose');

const WishlistSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    game:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Games',
    }],
    show:{
        type: Boolean,
        default: false
    }
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
exports.Wishlist = Wishlist;