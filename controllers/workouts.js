const express = require('express')
const router = express.Router()
const Workout = require('../models/workouts')
const authenticateToken = require('../auth/authenticateToken')

// Index
router.get('/', authenticateToken ,(req, res) => {
    Workout.find({}, (err, foundWorkouts) => {
        res.json(foundWorkouts)
    })
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
router.post('/', authenticateToken, (req, res) => {
    Workout.create(req.body, (err, createdWorkout) => {
        res.json(createdWorkout)
    })
})

// Show
router.get('/:id', authenticateToken, (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkout) => {
        res.json(foundWorkout)
    })
})

module.exports = router