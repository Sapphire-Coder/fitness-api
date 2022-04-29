const express = require('express')
const router = express.Router()
const Post = require('../models/posts')
const authenticateToken = require('../auth/authenticateToken')

// Index
router.get('/', authenticateToken, (req, res) => {
    Post.find({}, (err, foundPosts) => {
        res.json(foundPosts)
    })
})

// Delete
router.delete('/:id', authenticateToken, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        res.json(deletedPost)
    })
})

// Update
router.put('/:id', authenticateToken, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedPost) => {
        res.json(updatedPost)
    })
})

// Create
router.post('/', authenticateToken, async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        workout: req.body.workout,
        content: req.body.content,
        user: req.user._id
    })
    res.json(post)
})

// Show
router.get('/:id', authenticateToken, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.json(foundPost)
    })
})

module.exports = router