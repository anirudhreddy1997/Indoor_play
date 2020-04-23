const mongoose  = require('mongoose');
const validator = require('validator');
const Joi = require('Joi');
const gameTypes = ['Adult', 'Children'];
console.log("games");
const GameSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3,
        maxlength: 25
    },
    type:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v){
                return validator.isIn(v, gameTypes);
                },
                message: 'Invalid e-mail'
            }
    },
    description:{
        type:String,
        trim:true,
        minlength: 8,
    },
    deleted:{
        type: Boolean,
        default: false
    }
});

const Game = mongoose.model('Games', GameSchema);



exports.Game = Game;