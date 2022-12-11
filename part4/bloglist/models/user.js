const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    validate: {
      validator: (v) => {
        return /^\w*$/.test(v)
      }
    }
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret.passwordHash
    delete ret._id
    delete ret.__v
    return ret
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
