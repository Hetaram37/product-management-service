'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const ObjectId = mongoose.Schema.Types.ObjectId

const noteSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  title: String,
  text: String,
  list: [
    {
      id: Number,
      name: String,
      status: Boolean
    }
  ],
  link: [
    {
      id: Number,
      name: String
    }
  ],
  image: String,
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
  collection: 'notes'
})

module.exports = mongoose.model('notes', noteSchema)
