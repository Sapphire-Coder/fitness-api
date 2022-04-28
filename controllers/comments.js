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

// Update
// router.put('/:id', authenticateToken, (req, res) => {
//     Comment.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedComment) => {
//         res.json(updatedComment)
//     })
// })

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

// Show
// router.get('/:id', authenticateToken, (req, res) => {
//     Comment.findById(req.params.id, (err, foundComment) => {
//         res.json(foundComment)
//     })
// })

module.exports = router