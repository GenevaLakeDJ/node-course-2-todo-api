// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Version 3.X.X needs to have the following arguments below instead of (err, db) -- (err, client)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
// Version 3.X.X. needs to have the following line below:
    // const db = client.db('TodoApp');


    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.close();

    // Version 3.X.X needs to change the above from db.close() to client.close();

    // db.collection('Users').insertOne({
    //     name: 'Charles',
    //     age: 32,
    //     location: 'Mexico City'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to create user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});