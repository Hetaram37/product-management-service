'use strict'

const loginRoute = require('./login')
const signUpRoute = require('./register')
const noteRoute = require('./note')

const cors = require('cors')

module.exports = (app) => {
  app.use('/api/auth', cors(), loginRoute)
  app.use('/api/auth', cors(), signUpRoute)
  app.use('/api/note', cors(), noteRoute)
}
