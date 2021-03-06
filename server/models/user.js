// Don't need to import mongoose.js library we created, just mongoose module.
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;
    // $pull is a mongodb operator
    // return lets us chain together our call that we set up inside server.js
    return user.update({
        $pull: {
            tokens: {
                // could simplify below if we want in ES6
                token: token
            }
        }
    });
};

// Instance methods get called with the individual document,
// thus var user above, but
// Model methods get called with the model as the "this" binding
// this var User below


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
       '_id': decoded._id,
       // Quotes are required when there is a dot in the value.
       'tokens.token': token,
       'tokens.access': 'auth' //Auth is not a variable, it's the string response
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            // user.password gives us access to the hashed password
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    // Resolve the promise with the user
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

//Need to provide and call next below, otherwise middleware will crash.
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// Define schema
// Can use mongoose validators / schemas
const User = mongoose.model('User', UserSchema);

// export object where User: User - shortcut it for ES6
module.exports = {User};