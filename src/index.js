const express = require('express')
require('./db/mongoose')
const User=require('./models/user')
 const Task = require('./models/task')
const userRouter= require('./routers/user')
const taskRouter = require('./routers/task')

const app=express()
const port = process.env.PORT 
console.log(port)


//middleware should be above app.use
// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
    
// })

// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize: 10000000 //1MB
//     },
//     fileFilter(req,file,callback){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return callback(new Error ('Please upload a pdf'))
//         }
//         callback(undefined,true)
//     }
// })
// //create a new endpoint to upload these images
// app.post('/upload',upload.single('upload'), (req,res)=>{
//     res.send()
// }) 


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('server is up on port ' + port)
})

// const bcrypt = require('bcryptjs')

// const jwt=require('jsonwebtoken')

// const myFunction = async() =>{
//     const token=jwt.sign({_id:'abcd'},'thisismynewcourse')
//     console.log(token)

//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// myFunction()
// const mainm =async()=>{
//     const user=await User.findById('5e8ba026f4432635a813cd2a')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// mainm()