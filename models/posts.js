const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true}
})

const workoutSchema = new mongoose.Schema({
    exercises: { type: [exerciseSchema], required: true },
    calories: { type: Number, required: true},
})

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    workout: {type: workoutSchema, required: true},
    content: { type: String, required: true },
    user: { type: String, required: true }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post