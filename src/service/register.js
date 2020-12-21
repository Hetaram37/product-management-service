'use strict'

const {
  errorGenerator
} = require('../lib/utils')
const {
  saveUser,
  findUser
} = require('../repository/user')
const httpStatusCodes = require('http-status-codes')
const SERVICE_CON = 'PMS_L_S_'
const Joi = require('@hapi/joi')

const userSignup = async (body) => {
  console.debug('userSignup() body: %j', body)
  await validateInput(body)
  await isExist(body.email)
  body.passwordConfirm = undefined
  const userData = await saveUser(body)
  userData.password = undefined
  console.debug('User details: %j', userData)
  return userData
}

async function isExist (email) {
  const user = await findUser({ email }, { _id: 1 })
  if (user) {
    throw errorGenerator('User already exist with this email', SERVICE_CON + httpStatusCodes.BAD_REQUEST,
      'User already exist wih this email', null)
  }
}

async function validateInput (body) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(25)
      .required(),
    email: Joi.string()
      .min(2)
      .max(50).email()
      .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
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
  userSignup
}
