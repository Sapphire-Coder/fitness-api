const express = require('express')
const router = express.Router()
const Workout = require('../models/workouts')
const authenticateToken = require('../auth/authenticateToken')

// Index
router.get('/', authenticateToken, async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id })
    res.json(workouts)
})

// Delete
router.delete('/:id', authenticateToken, (req, res) => {
    Workout.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
        res.json(deletedWorkout)
    })
})

// Update
router.put('/:id', authenticateToken, (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedWorkout) => {
        res.json(updatedWorkout)
    })
})

// Create
router.post('/', authenticateToken, async (req, res) => {
    const workout = await Workout.create({
        exercises: req.body.exercises,
        calories: req.body.calories,
        user: req.user._id
    })
    res.json(workout)
})

// Show
router.get('/:id', authenticateToken, (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkout) => {
        res.json(foundWorkout)
    })
})

module.exports = router