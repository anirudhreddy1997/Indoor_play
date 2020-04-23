const mongoose  = require('mongoose');
const validator = require('validator');
const Joi = require('Joi');
const gameTypes = ['Adults', 'Kids'];
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
                message: 'Invalid game type'
            }
    },
    description:{
        type:String,
        trim:true,
        minlength: 8,
    },
});

const Game = mongoose.model('Games', GameSchema);


// function validateGame(game){
//     const schema = {
//         name: Joi.string().min(3).max(25).required(),
//         type: Joi.string().min(8).max(255).required(),
//         description: Joi.string().min(8),
//     }
//     return Joi.validate(game, schema);
// }


exports.Game = Game;
