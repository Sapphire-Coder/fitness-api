const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true}
})

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: String, required: true },
    comments: [commentSchema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post