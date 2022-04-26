const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authenticateToken = async (req, res, next) => {
    const token = await req.headers['x-access-token']

    if(!token) return res.status(401)

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = await User.findById(decode.user).select('-password')
    next()
}

module.exports = authenticateToken