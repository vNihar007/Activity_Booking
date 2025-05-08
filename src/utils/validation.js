const Joi = require("joi");
const mongoose = require('mongoose'); 


const userValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    phone_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required(),
  });

const loginValidationSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const activityValidationSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().allow(''),
  location: Joi.string().trim().required(),
  date: Joi.date().iso().required(), 
});

const bookingValidationSchema = Joi.object({
  activityId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId validation')
    .messages({
      'any.invalid': '"activityId" must be a valid MongoDB ObjectId',
      'string.base': '"activityId" should be a string',
      'any.required': '"activityId" is required'
    })
});

module.exports = {userValidationSchema,loginValidationSchema,activityValidationSchema,bookingValidationSchema};
    