const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv");

const { Customer, Employee } = require("../models");
const createError = require("../utils/create-error");
const { USER_EMPLOYEE, USER_ADMIN } = require("../config/constant");

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
        role: USER_EMPLOYEE
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

    if (customer) {
      const isCorrect = await bcrypt.compare(password, customer.password);

      console.log(customer.password);

      if (!isCorrect) {
        createError("invalid username or password");
      }

      caccessToken = jwt.sign({
        id: customer.id,
        username: customer.username,
        email: customer.email,
        companyName: customer.companyName,
        firstName: customer.firstName,
        lastName: customer.lastName
      });
    }

    let accessToken;

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

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
