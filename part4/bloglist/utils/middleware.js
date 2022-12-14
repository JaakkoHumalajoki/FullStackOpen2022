const logger = require('./logger')

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

  next(err)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
