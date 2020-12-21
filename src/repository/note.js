'use strict'

const {
  config
} = require('../lib/utils')
require('../model/note')
const database = config.get('database')

const findNotes = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const noteDetails = db.model('notes')
    const notes = await noteDetails.find(query, projection).lean().sort('-created_on')
    return notes
  } catch (error) {
    console.error('Error while getting notes details: %s %j', error, error)
    throw error
  }
}

const saveNote = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const NoteDetails = db.model('notes')
    const notes = new NoteDetails(data)
    return notes.save()
  } catch (error) {
    console.error('Error while saving notes details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  findNotes,
  saveNote
}
