const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true},
    calories: { type: Number, required: true},
    user: { type: String, required: true }
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout