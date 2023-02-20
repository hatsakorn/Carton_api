const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  userName: Joi.string().trim().required().messages({
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
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is required"
    }),
  firstName: Joi.string().trim().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
    "string.base": "first name must be a string"
  }),
  surName: Joi.string().trim().required().messages({
    "string.empty": "surname is required"
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
    })
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required()
});
