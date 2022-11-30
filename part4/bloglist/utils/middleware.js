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

module.exports = { requestLogger, unknownEndpoint }
