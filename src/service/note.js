'use strict'

const {
  saveNote,
  findNotes
} = require('../repository/note')
const { arrayWithElement, config } = require('../lib/utils')

const addNote = async (note, files) => {
  console.log('addNote() note: %j, files: %j', note, files)
  await saveNote(inputForNote(note, files))
}

function inputForNote (note, files) {
  console.log('inputForNote() note: %j, files: %j', note, files)
  if (arrayWithElement(files) && files[0].filename) {
    note.image = files[0].filename
  }
  console.log('inputForNote() note: %j', note)
  return note
}

const getNotes = async (id) => {
  console.log('getNotes() id: %s', id)
  let notes = await findNotes({ user_id: id }, notesProjection())
  notes = await getImageFinalPath(notes)
  return notes
}

function notesProjection () {
  const projection = {}
  projection.list = true
  projection.link = true
  projection.image = true
  projection.title = true
  projection.text = true
  projection.user_id = true
  return projection
}

async function getImageFinalPath (notes) {
  console.debug('getImageFinalPath() notes: %j', notes)
  try {
    await Promise.all(notes.map(note => {
      if (note.image) {
        note.image_url = `${config.image.protocol}://${config.image.host}:${config.port}/public/${note.image}`
      }
    }))
    console.debug('getImageFinalPath() images with path: %j', notes)
    return notes
  } catch (err) {
    console.log('Hiiie errr: %j %s', err, err)
    throw err
  }
}

module.exports = {
  addNote,
  getNotes
}
