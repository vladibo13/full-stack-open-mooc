const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  // code that extracts the token
  const authorization = req.get('authorization')
  logger.info(authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    logger.info(authorization)
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  if(!req.token) {
    req.user = null
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
      req.user = null
    } else {
      const user = await User.findById(decodedToken.id)
      req.user = user
    } 
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}