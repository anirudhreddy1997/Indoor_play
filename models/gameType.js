const mongoose  = require('mongoose');
const validator = require('validator');
const Joi = require('Joi');
console.log("Game Type in database");
const gameTypeSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3,
        maxlength: 25
    },
});

const gameType = mongoose.model('gameType', gameTypeSchema);
function validateGameType(gameType){
    const schema = {
        name: Joi.string().min(3).max(25).required(),
    }
    return Joi.validate(gameType, schema);
}


exports.gameType = gameType;
exports.validateGameType = validateGameType;