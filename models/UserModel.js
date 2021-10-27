const mongoose = requiree("/config/database.js");
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');

const userSchema = new mongoose.Schema( {
    email: { 
        type: String, 
        required: true,
        unique : true,
        trim : true
        },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        minlength : 6 
    },
    isAdmin: { 
        type: Boolean, 
        default:false
    },
    apiKey: {
        type: String,
        default: function() {
             return cryptoRandomString({length: 32, type: 'base64'});
        }
    },
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamps);

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User',userSchema)
//-- automatic create users document indb

module.exports = User ;