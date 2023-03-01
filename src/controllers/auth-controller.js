const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Customer, Employee } = require("../models");
const createError = require("../utils/create-error");
const { USER_EMPLOYEE, USER_ADMIN } = require("../config/constant");
const {
  customerValidateRegister,
  employeeValidateRegister
} = require("../validators/auth-validators");
const { Op } = require("sequelize");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const customer = await Customer.findOne({
      where: {
        username: username
      }
    });

    const employee = await Employee.findOne({
      where: {
        username: username,
        role: "EMPLOYEE"
      }
    });

    const admin = await Employee.findOne({
      where: {
        username: username,
        role: USER_ADMIN
      }
    });

    if (!customer && !employee && !admin) {
      createError("invalid username or password");
    }

    let accessToken;
    if (customer) {
      const isCorrect = await bcrypt.compare(password, customer.password);

      // console.log(customer.password);

      if (!isCorrect) {
        createError("invalid username or password");
      }

      accessToken = jwt.sign(
        {
          id: customer.id,
          username: customer.username,
          email: customer.email,
          companyName: customer.companyName,
          firstName: customer.firstName,
          lastName: customer.lastName
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );
    }

    if (employee) {
      isCorrect = await bcrypt.compare(password, employee.password);

      if (!isCorrect) {
        createError("invalid username or password");
      }

      accessToken = jwt.sign(
        {
          id: employee.id,
          username: employee.username,
          email: employee.email,
          firstName: employee.firstName,
          lastName: employee.lastName,
          role: employee.role
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );
    }

    if (admin) {
      isCorrect = await bcrypt.compare(password, admin.password);

      if (!isCorrect) {
        createError("invalid username or password");
      }

      accessToken = jwt.sign(
        {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );
    }
    // console.log(accessToken);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.customerRegister = async (req, res, next) => {
  try {
    const value = customerValidateRegister(req.body);

    const customer = await Customer.findOne({
      where: {
        [Op.or]: [
          {
            username: value.username
          },
          { email: value.email }
        ]
      }
    });
    if (customer) {
      createError("username or email already in use", 400);
    }
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          {
            username: value.username
          },
          { email: value.email }
        ]
      }
    });
    if (employee) {
      createError("username or email is already in use", 400);
    }

    // console.log(customer);
    // if (customer === employee) {
    //   createError("username or email is already in use", 400);
    // }
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
        [Op.or]: [
          {
            username: value.username
          },
          { email: value.email }
        ]
      }
    });
    if (employee) {
      createError("username or email is already in use", 400);
    }

    const customer = await Customer.findOne({
      where: {
        [Op.or]: [
          {
            username: value.username
          },
          { email: value.email }
        ]
      }
    });
    if (customer) {
      createError("username or email is already in use", 400);
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

////////////////////////////////////////////////////////////////////////////////////////

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
