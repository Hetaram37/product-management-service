'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const {
  findUser
} = require('../repository/user')
const httpStatusCodes = require('http-status-codes')
const SERVICE_CON = 'PMS_L_S_'
const { generateToken } = require('./token')
const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')

const userLogin = async (body) => {
  console.debug('userLogin() body: %j', body)
  await validateInput(body)
  const userData = await findUser({ email: body.email }, projectionUser())
  console.debug('User details: %j', userData)
  if (!userData || !(await isValidPassword(body.password, userData.password))) {
    throw errorGenerator('Invalid login credentials', SERVICE_CON + httpStatusCodes.UNAUTHORIZED,
      'Invalid login credentials', null)
  }
  const tokenDetails = await generateToken(userData._id)
  console.log('Token details: %j', tokenDetails)
  const response = finalResponse(userData, body, tokenDetails)
  return response
}

function finalResponse (userData, body, tokenDetails) {
  const response = {}
  response.email = body.email
  response.token = tokenDetails.token
  response.expire_on = tokenDetails.expire_on
  response.user_id = userData._id
  response.name = userData.name
  return response
}

async function isValidPassword (password, incomingPass) {
  return await bcrypt.compare(password, incomingPass)
}

function projectionUser () {
  const projection = {}
  projection.name = true
  projection.email = true
  projection.password = true
  projection._id = true
  return projection
}

async function validateInput (body) {
  const schema = Joi.object({
    email: Joi.string()
      .min(2)
      .max(50).email()
      .required(),
    password: Joi.string().required()
  })

  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator('Partial content', SERVICE_CON + httpStatusCodes.PARTIAL_CONTENT,
      'Partial content', null)
  }
}

module.exports = {
  userLogin
}
