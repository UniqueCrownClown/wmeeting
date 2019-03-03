import Joi from 'joi'

const registerSchema = Joi.object().keys({
  usercard: Joi.string().regex(/^A\d{4}$/),
  username: Joi.string().regex(/^[\u4e00-\u9fa5\w]{2,10}$/),
  password: Joi.string().regex(/^\w{6,8}$/),
  confirmPassword: Joi.string().regex(/^\w{6,8}$/)
})

export default registerSchema
