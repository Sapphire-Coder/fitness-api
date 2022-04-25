require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const db = mongoose.connection
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const usersController = require('./controllers/users')
app.use('/users', usersController)
const workoutsController = require('./controllers/workouts')
app.use('/workouts', workoutsController)

mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
    console.log('MongoDB connected')
})

db.on('error', err => console.log(`Error connecting to MongoDB: ${err.message}`))
db.on('disconnected', () => console.log('MongoDB disconnected'))

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))