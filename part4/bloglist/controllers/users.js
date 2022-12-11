const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: 'Missing password' })
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .json({ error: 'Password must be a minimum 8 characters long' })
  }
  if (req.body.password.length > 50) {
    return res
      .status(400)
      .json({ error: 'Password too long (max 50 characters)' })
  }
  if (!/^\w{8,50}$/.test(req.body.password)) {
    return res
      .status(400)
      .json({ error: 'Password must only contain alphanumeric characters' })
  }
  if (
    !/[a-zA-Z]+/.test(req.body.password) ||
    !/[0-9]+/.test(req.body.password)
  ) {
    return res
      .status(400)
      .json({ error: 'Password must contain both letters and numbers' })
  }
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const userData = {
    name: req.body.name || '',
    username: req.body.username,
    passwordHash
  }
  const savedUser = await new User(userData).save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
