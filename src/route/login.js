'use strict'

const router = require('express').Router()
const {
  userAuthentication
} = require('../controller/login')

router.post('/login', userAuthentication)

module.exports = router
