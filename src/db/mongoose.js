const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser: true,
    useCreateIndex: true, //quick access to data while indexing or using mongo db
    useFindAndModify:true
})


// const Task = mongoose.model('Task',{
//     description:{
//         type: String,
//         required: true,
//         trim:true
//     },
//     completed: {
//         type: Boolean,
//         default:false
//     }
// })

