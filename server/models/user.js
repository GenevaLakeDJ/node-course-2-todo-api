// Don't need to import mongoose.js library we created, just mongoose module.
var mongoose = require('mongoose');

// Define schema
// Can use mongoose validators / schemas
const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {User};