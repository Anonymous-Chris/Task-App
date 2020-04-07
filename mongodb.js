const chalk = require('chalk')
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
         return console.log(chalk.red.inverse('Unable to connect to database'))
    }

         const db = client.db(databaseName)

         db.collection('users').deleteMany({

             age:25
         })

            // db.collection('tasks').updateMany({
            //     completed:false
            // },{
            //     $set:{
            //         completed: true
            //     }
            // }).then((result)=>{
            //     console.log(result)
            // }).catch((error)=>{
            //     console.log(error)
            // })
        //     db.collection('users').updateOne({
        //      _id: new ObjectID("5e85ab5ab6c4d505e41453bb")
        //  },{
        //      $set:{
        //          name: 'Saroj',
        //          age: 22
        //      }
        //  }).then((result)=>{
        //     console.log(result)
        //  }).catch((error)=>{
        //      console.log(error)
        //  })
        // db.collection('users').findOne({age:27},(error,user)=>{
        //     if(error){
        //         return console.log('Unable to fetch user')
        //     }

        //     console.log(user)
        // })
        // db.collection('users').find({age:25}).toArray((error,users)=>{
        //     console.log(users)
        // })


        // db.collection('tasks').find({completed: false}).toArray((error,tasks)=>{
        //     console.log(tasks)
        // })



        // db.collection('tasks').insertMany([{
        //     description: 'Do exam',
        //     completed: true
        // },{
        //     description: 'Project of DIP',
        //     completed: false
        
        // },{
        //     description:'Modern JS',
        //     completed: true
        // }],(error,result)=>{
        //     if(error){
        //         return console.log('Unable to connect')
        //     }
        //     console.log(result.ops)
        // })
        // db.collection('users').insertMany([{
        //     name:'Kshitij',
        //     age:25
        // }, {
        //     name:'kristy',
        //     age:24
        // }],(error,result)=>{
        //     if(error){
        //         return console.log('Unable to insert')
        //     }
        //     console.log(result.ops)
        // })

    //     db.collection('users').insertOne({
    //         _id:id,
    //         name: 'Vikram',
    //         age: 21
    //     },(error,result)=>{
    //         if(error){
    //             return console.log('Unable to insert user')
    //         }
    //         console.log(result.ops)
    //     })
 
     })

