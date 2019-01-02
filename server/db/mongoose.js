const mongoose = require('mongoose');

// Made before native promises in JS, so identify types of promise (using mongoose native), then connect to db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};