'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  created_by: {
    type: String,
    default: 'SYSTEM'
  },
  updated_by: {
    type: String,
    default: 'SYSTEM'
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'user'
})

userSchema.pre('save', async function (next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

module.exports = mongoose.model('user', userSchema)
