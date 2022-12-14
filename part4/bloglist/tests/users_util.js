const User = require('../models/user')

const userTeekkari = {
  username: 'teekkari',
  name: 'Teemu Teekkari',
  password: 'password1234',
  passwordHash: 'dummytext'
}

const listOfThreeUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'password1234',
    passwordHash: 'dummytext'
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'password1234',
    passwordHash: 'dummytext'
  },
  {
    username: 'teksu',
    name: 'Teemu Teekkari',
    password: 'password1234',
    passwordHash: 'dummytext'
  }
]

const getNonexistantId = async () => {
  const user = new User(userTeekkari)
  await user.save()
  await user.remove()
  return user._id
}

module.exports = { userTeekkari, listOfThreeUsers, getNonexistantId }
