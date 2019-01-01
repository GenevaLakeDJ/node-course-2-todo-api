const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// const id = '5c2bcc6fed7e36e046f05cf5';

// if(!ObjectId.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// User.findByID

const userid = '5c2b902ca9c59c84566e61ae';

if(!ObjectId.isValid(userid)) {
    console.log('ID not valid');
}

User.findById(userid).then((user) => {
    if(!user) {
        return console.log('User id not found');
    }
    console.log('User By Id', user);
}).catch((e) => consolelog(e));