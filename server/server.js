// Below has been moved to its own file - mongoose.js
// const mongoose = require('mongoose');

// // Made before native promises in JS, so identify types of promise (using mongoose native), then connect to db
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

const express = require('express');
const bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');
// Below was added after the above was moved, to import the mongoose.js file we created.
// Below uses ES6 destructuring (destructures an object)
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // Send back as an object, so you can send additional data with it, such as a status code, etc.)
        res.send({
            todos,
            code: 'asdf'
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    // Below gets back the sent parameter....like GET /todos/1234324
    // res.send(req.params);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });
    // Validate is uding isValid
        // 404 - send() - send back empty body
    // findById
        // success
            // if todo - send it back
            // if no todo - send back 404 with empty body
        // error
            // 400 - send() - send back emtpy body

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};

// Define schema
// Can use mongoose validators / schemas
// Below have been moved to their own files - todo.js and user.js
// const Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// const User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     }
// });

// Create new document - below are examples
// Can use mongoose validators
// const newTodo = new Todo({
//     text: 'Go to sleep'
// });

// const newUser = new User({
//     email: ' user1@xyz.com'
// });

// // Save document to db - below are examples
// newTodo.save().then((doc) => {
//     console.log('Saved todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// newUser.save().then((doc) => {
//     console.log('Saved user', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save user', e);
// });

// User model
// Email - require it - trim it - set type equal to string, set min length of 1

