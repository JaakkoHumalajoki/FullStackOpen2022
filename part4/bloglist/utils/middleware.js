const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { LOGIN_SECRET } = require('./config')

const requestLogger = (req, _res, next) => {
  const method = req.method
  const url = req.url
  const body = { ...req.body }
  // ensuring passwords aren't logged
  if (body.password) {
    delete body.password
  }
  const bodyString = JSON.stringify(body)

  logger.info(`${method} ${url} ${bodyString}`)

  next()
}

const tokenExtractor = (req, _res, next) => {
  const auth = req.headers.authorization
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'missing token' })
  }

  const userInfo = jwt.verify(req.token, LOGIN_SECRET)
  const user = await User.findById(userInfo.id)
  if (!user) {
    return res
      .status(401)
      .json({ error: 'your account been deleted from database' })
  }

  req.user = user
  next()
}

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'uknown endpoint' })
}

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(err)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
