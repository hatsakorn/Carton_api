const createError = require("../utils/create-error");
const {
  customerValidateRegister,
  employeeValidateRegister
} = require("../validators/auth-validators");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Customer, Employee } = require("../models");

exports.customerRegister = async (req, res, next) => {
  try {
    const value = customerValidateRegister(req.body);

    const customer = await Customer.findOne({
      where: {
        username: value.username || "",
        email: value.email || ""
      }
    });
    if (customer) {
      createError("username or email already in use", 400);
    } else {
      createError("username or email already in use", 400);
    }

    const employee = await Employee.findOne({
      where: {
        username: value.username || "",
        email: value.email || ""
      }
    });
    if (employee) {
      createError("username or email is already in use", 400);
    } else {
      createError("username or email already in use", 400);
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

////////////////////////////////////////////////////////////////////////////////////////

exports.employeeRegister = async (req, res, next) => {
  try {
    const value = employeeValidateRegister(req.body);

    const employee = await Employee.findOne({
      where: {
        username: value.username || "",
        email: value.email || ""
      }
    });
    if (employee) {
      createError("username or email is already in use", 400);
    } else {
      createError("username or email already in use", 400);
    }

    const customer = await Customer.findOne({
      where: {
        username: value.username || "",
        email: value.email || ""
      }
    });
    if (customer) {
      createError("username or email is already in use", 400);
    } else {
      createError("username or email already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await Employee.create(value);

    res.status(201).json({
      message: "employee register success. please log in to continue."
    });
  } catch (err) {
    next(err);
  }
};
