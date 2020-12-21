'use strict'

const router = require('express').Router()
const {
  addNewNote,
  getAllNote
} = require('../controller/note')
const { uploadFiles } = require('../middleware/upload')

router.post('/', uploadFiles.array('image', 1), addNewNote)
router.get('/:id', getAllNote)

module.exports = router
