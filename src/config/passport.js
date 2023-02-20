const passport = require("passport");
require('dotenv')
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Customer,Employee } = require("../models");
const { USER_EMPLOYEE, USER_ADMIN } = require("../config/constant");

let options = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new JwtStrategy(options, async (payload,done) => {
        try{
            const customer = await Customer.findOne({ where: {id: payload.id}}) 
            if(customer) return done(null,customer)
            const employee = await Employee.findOne({ where: {id: payload.id,role: USER_EMPLOYEE}})
            if(employee) return done(null,employee)
            const admin = await Employee.findOne({ where: {id: payload.id,role: USER_ADMIN}})
            if(admin) return done(null,admin)
            return done(new Error("user not Found"), false)
        }catch(err) {
            return done(null,false);
        }
    })
)