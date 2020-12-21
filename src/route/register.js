'use strict'

const router = require('express').Router()
const {
  userRegister
} = require('../controller/register')

router.post('/signup', userRegister)

module.exports = router
