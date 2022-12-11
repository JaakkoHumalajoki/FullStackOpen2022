const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const userData = {
    name: req.body.name,
    username: req.body.username,
    passwordHash
  }
  const savedUser = await new User(userData).save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
