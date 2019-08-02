const express = require('express')
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


// endpoint to fetch the user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// endpoint for fetching all intems
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})


// endpoint for updating an item by ID
router.patch('/users/me', auth, async (req, res) => {                                                                      
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }    

try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
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

module.exports = router