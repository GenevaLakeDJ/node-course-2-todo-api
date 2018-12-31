// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Version 3.X.X needs to have the following arguments below instead of (err, db) -- (err, client)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').deleteMany({name: "Andrew"}).then((result) => {
        console.log(result);
    });
    db.collection('Users').deleteOne({
        _id: new ObjectID('5c2966d7951f7e33f838a155')
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })
    // db.close();
});