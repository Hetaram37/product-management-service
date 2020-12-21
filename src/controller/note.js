'use strict'

const {
  responseGenerators,
  getStatusCode,
  errorGenerator
} = require('../lib/utils')
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('http-status-codes')
const {
  addNote,
  getNotes
} = require('../service/note')
const CONTROLLER_CONS = 'PMS_A_C_'

const addNewNote = async (req, res, next) => {
  try {
    console.debug('addNewNote()')
    const response = await addNote(req.body, req.files)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while adding new note: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const getAllNote = async (req, res) => {
  try {
    console.debug('getAllNote()')
    const response = await getNotes(req.params.id)
    console.log('sfdfdfccsds d')
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while getting all note: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      return res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      return res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      return res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

module.exports = {
  addNewNote,
  getAllNote
}
