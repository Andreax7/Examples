const mongoose = require('mongoose');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    _id_usr: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6,'minimum character is 6']
    },
    role: {
        type: String,
	    required: true,
    },
    status: {
        type: String,
	    required: true,
    },
   
});

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;