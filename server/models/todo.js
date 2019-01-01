// Don't need to import mongoose.js library we created, just mongoose module.
var mongoose = require('mongoose');

// Define schema
// Can use mongoose validators / schemas
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// export object where Todo: Todo - shortcut it for ES6
module.exports = {Todo};