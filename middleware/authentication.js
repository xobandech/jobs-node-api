const { UnauthenticatedError } = require("../errors")
const User = require("../models/User")
const jwt = require("jsonwebtoken")


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader.startsWith('Bearer ') || !authHeader) {
        throw new UnauthenticatedError("Invalid auth headers")
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
    } catch (e) {
        throw new UnauthenticatedError("Invalid auth headers")
    }
    next()
}

module.exports = authMiddleware
