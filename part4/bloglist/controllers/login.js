const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { LOGIN_SECRET } = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(401).json({ error: 'Missing username or password' })
  }

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).json({ error: "Username doesn't exist" })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Password or username incorrect' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, LOGIN_SECRET, { expiresIn: 60 * 60 })

  return res
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
