const mongoose  = require('mongoose');
// const validator = require('validator');
const Joi = require('Joi');

const AdultSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 25
    }
});

const Adult = mongoose.model('Adult', AdultSchema);
function validateAdult(adult){
    const schema = {
        name: Joi.string().min(3).max(25).required()
    }
    return Joi.validate(adult, schema);
}

exports.Adult = Adult;
exports.validateAdult = validateAdult;