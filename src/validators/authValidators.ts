import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
  name: Joi.string().allow('', null),
});
