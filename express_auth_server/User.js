const mongoose = require('mongoose');
const {isEmail} = require('validator');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String
    },
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
    address: String,
    firstName: String,
    lastName: String
});

//Pre-function to hash password with bcrypt -saving hashed pass in db

/*UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(12);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.comparePassword = function(plaintext, callback) {
	console.log(plaintext, this.password);
    return bcrypt.compare(plaintext, this.password);
};
 function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });
  };
*/
var userModel = mongoose.model('user', UserSchema);
module.exports = userModel;