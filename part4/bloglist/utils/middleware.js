const morgan = require('morgan')

const requestLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'uknown endpoint' })
}

const errorHandler = (err, _req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
