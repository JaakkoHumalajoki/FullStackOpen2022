const logger = require('./logger')

const requestLogger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const body = JSON.stringify(req.body)
  logger.info(`${method} ${url} ${body}`)

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

  next(err)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
