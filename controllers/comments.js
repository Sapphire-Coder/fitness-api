const express = require('express')
const router = express.Router()
const Comment = require('../models/comments')
const authenticateToken = require('../auth/authenticateToken')

// Index
router.get('/:id', authenticateToken, (req, res) => {
    Comment.find({ post: req.params.id }, (err, foundComments) => {
        res.json(foundComments)
    })
})

// Delete
router.delete('/:id', authenticateToken, (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        res.json(deletedComment)
    })
})

// Create
router.post('/', authenticateToken, async (req, res) => {
    const comment = await Comment.create({
        user: req.user._id,
        username: req.user.username,
        post: req.body.post,
        comment: req.body.comment
    })
    res.json(comment)
})

module.exports = router