const createError = require("../utils/create-error");
const { validateRegister } = require("../validators/auth-validators");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Customer } = require("../models");

exports.customerRegister = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const customer = await Customer.findOne({
      where: {
        email: value.email || ""
      }
    });
    if (customer) {
      createError("email  is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await Customer.create(value);

    res
      .status(201)
      .json({ message: "register success. please log in to continue." });
  } catch (err) {
    next(err);
  }
};
