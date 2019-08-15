const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


// --------------------USERS-----------------------

// alternative solution to do validation of input in registration form
// onChange in input form there is an http request to validate the input

// router.post('/user/check', async (req, res) => {    
//     const user = new User(req.body)
//     console.log(user)
    
//     try {
//         await user.validate()
//         res.status(200).send(user)
//     } catch(e) {
//         res.status(400).send(e)
//     } 
// })


// endpoint for creating a new instance
    // sign up of user
router.post('/users', async (req, res) => {    
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    } 
})


// endpoint for logging user in
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        const eMsg = JSON.stringify(e.message)
        res.status(400).send(eMsg)

    }
})


// endpoint to log-out
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // the array 'tokens' consists of token-objects, so 'token' is an object with the properties 'id' and 'token'
            return token.token !== req.token
        })
        await req.user.save()
        res.send(req.user) 
    } catch(e) {
        res.status(500).send()
    }
})

// endpoint to log-out on all devices (wipe all tokens)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)   
    } catch(e) {
        res.status(500).send()
    }
})


// // endpoint to fetch the user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//--------

// // endpoint for fetching all intems
//     // currently not needed, there is no page that shows all users

// router.get('/users', auth, async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch(e) {
//         res.status(500).send()
//     }
// })


// endpoint for updating the password
router.patch('/users/me/password', auth, async (req, res) => {                                                                      
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'oldPassword', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }    

try {
    await User.checkPassword(req.body.email, req.body.oldPassword)
    updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        const eMsg = JSON.stringify(e.message)
        res.status(400).send(eMsg)
    }
})

// endpoint for updating name and/or email
router.patch('/users/me/profile', auth, async (req, res) => {                                                                      
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }    

try {
    updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        const eMsg = JSON.stringify(e.message)
        res.status(400).send(eMsg)
    }
})

// endpoint for deleting an item by ID
// only own profile should be removable, that's why removing by ID is no longer possible
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

// uploading a profile picture - middleware (multer)
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

            return cb(new Error('Please upload an Image'))
        }

        cb(undefined, true)
    }
})


// endpoint to upload an avatar-picture
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize(100, 100).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    req.user.avatarAvailable = true 
    console.log('req.file.buffer: ', req.file.buffer)
    console.log('constBuffer: ', buffer)
    // console.log('body: ', req.body)
    // console.log('avatar: ', req.user.avatar)
    // console.log('user: ', req.user)


    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// endpoint to delete the avatar-picture
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.avatarAvailable = false

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// fetching an avatar-picture
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // setup of response-header
        res.set('Content-Type', 'image/png')

        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router