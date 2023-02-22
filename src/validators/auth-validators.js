const Joi = require("joi");

const validate = require("./validate");

const customerRegisterSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "any.required": "user name is required",
    "string.empty": "user name is required",
    "string.base": "user name must be a string"
  }),

  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "email is required"
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password mush have at least 6 characters"
  }),

  companyName: Joi.string().trim().required().messages({
    "string.empty": "lastName is required"
  }),
  firstName: Joi.string().trim().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
    "string.base": "first name must be a string"
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "lastName is required"
  }),
  telephoneNumber: Joi.string()
    .alphanum()
    .min(10)
    .required()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "telephoneNumber is required",
      "string.alphanum": "telephoneNumber must contain number or alphabet",
      "string.min": "telephoneNumber mush have at least 10 characters"
    }),
  address: Joi.string().trim().required().messages({
    "string.empty": "lastName is required"
  }),
  confirmPassword: Joi.string()
  .valid(Joi.ref('password'))
  .required()
  .trim()
  .messages({
    'any.only': 'password and confirm password did not match',
    'string.empty': 'confirm password is required'
  })
  .strip()
});

exports.customerValidateRegister = validate(customerRegisterSchema);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const employeeRegisterSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
    "string.base": "first name must be a string"
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "lastName is required"
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "email is required"
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password mush have at least 6 characters"
  }),

  telephoneNumber: Joi.string()
    .alphanum()
    .min(10)
    .required()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "telephoneNumber is required",
      "string.alphanum": "telephoneNumber must contain number or alphabet",
      "string.min": "telephoneNumber mush have at least 10 characters"
    }),
  username: Joi.string().trim().required().messages({
    "any.required": "user name is required",
    "string.empty": "user name is required",
    "string.base": "user name must be a string"
  })
});

exports.employeeValidateRegister = validate(employeeRegisterSchema);
