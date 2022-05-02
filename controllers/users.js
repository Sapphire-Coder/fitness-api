const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../auth/authenticateToken')

// Create
router.post('/', async (req, res) => {   
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = { username: req.body.username, password: hashedPassword, name: req.body.name}
        User.create(user, (err, createdUser) => {
            res.json(createdUser)
        })
    }
    catch {
        res.status(500).send()
    }
})

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if(!user) {
        return res.status(400).send('Cannot find user')
    }

    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            const id = { user: user._id }
            const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET)
            return res.json({ accessToken: accessToken })
        }
        else{
            return res.status(400).send()
        }
    }
    catch{
        return res.status(500).send()
    }
})

// Show
router.get('/user', authenticateToken, async (req, res) => {
    const user = await User.findById(req.user).select('-password')
    res.json(user)
})

module.exports = router