const passport = require("passport");
require("dotenv").config();
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Customer, Employee } = require("../models");
const { USER_EMPLOYEE, USER_ADMIN } = require("../config/constant");

let options = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const customer = await Customer.findOne({
        where: { id: payload.id, username: payload.username },
        attributes: {
          exclude: ["password"]
        }
      });
      if (customer) return done(null, customer);
      const employee = await Employee.findOne({
        where: {
          id: payload.id,
          username: payload.username,
          role: USER_EMPLOYEE
        },
        attributes: {
          exclude: ["password"]
        }
      });
      if (employee) return done(null, employee);
      const admin = await Employee.findOne({
        where: { id: payload.id, username: payload.username, role: USER_ADMIN },
        attributes: {
          exclude: ["password"]
        }
      });
      if (admin) return done(null, admin);
      return done(new Error("user not Found"), false);
    } catch (err) {
      return done(null, false);
    }
  })
);
