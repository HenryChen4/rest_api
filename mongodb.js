// const {MongoClient, ObjectID} = require('mongodb')

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const id = new mongodb.ObjectID()

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
    if(error){
        return console.log(error)
    } 
    const db = client.db(databaseName)
    // const updatePromise = db.collection('users').updateOne(
    //     {
    //         _id: new mongodb.ObjectID("5fe534ae673219280f685669")
    //     }, {
    //         $inc: {
    //             age: 1
    //         }
    //     }
    // )
    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // db.collection('tasks').deleteOne({
    //     completed: true
    // }).then((result)=>{
    //     console.log(result.deletedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').insertMany([{
        desc: 'Do dishes',
        completed: false
    }]).then((result)=>{
        console.log(result.insertedCount)
    }).catch((error)=>{
        console.log(error)
    })
})

