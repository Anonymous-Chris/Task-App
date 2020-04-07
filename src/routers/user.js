const express = require('express')
const router = new express.Router()
const User=require('../models/user')
const auth = require('../middleware/auth')
const sharp=require('sharp')
const {sendWelcomeEmail} = require('../emails/account')
router.get('/test',(req,res)=>{
    res.send('from a new file')
})

// app.post('/users',(req,res)=>{
//     console.log(req.body)
//     const user = new User(req.body)
//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })

// })-->converting it into async await function

router.post('/users',async(req,res)=>{
    //console.log(req.body)
    const user = new User(req.body)
    
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
       // console.log(user.email)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }

})

// router.post('/users/signup',async(req,res)=>{
//     try{

//     }catch(e){
//         res.status(400).send()
//     }
// })

router.post('/users/login',async(req,res)=>{
    try{
        //making a new function findbycredential
        const user = await User.findByCredential(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        res.send({user,token})

    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//logout of all sessions
router.post('/users/logoutAll',auth,async(req,res)=>{

    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})


router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})

//route parameters(:id)
// router.get('/users/:id',async(req,res)=>{
//     const _id = req.params.id 
//     try{
        
//         user =  await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }

// })

//update method
router.patch('/users/me',auth,async(req,res)=>{
    // const _id = req.params.id
    const updates = Object.keys(req.body)
    try{

        //const user = await User.findById(req.user._id)

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators: true})
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete method
router.delete('/users/me',auth,async(req,res)=>{
    // const _id = req.params.id
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

const multer = require('multer')
const upload = multer({
    // dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return callback(new Error('Please upload an image'))
        }
        callback(undefined,true)
    }
})


router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    //req.user.avatar=req.file.buffer
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user =await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send()
    }
})
//5e8bab8eecf74034386b7fe7

module.exports= router
