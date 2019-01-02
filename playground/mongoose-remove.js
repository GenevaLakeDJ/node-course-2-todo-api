const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Removes all
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Remove one and return document
// Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '5c2cefebf1681c0e973a1675'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('5c2cefebf1681c0e973a1675').then((todo) => {
    console.log(todo);
});