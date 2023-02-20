const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Customer,Employee } = require("../models");

let options = {
  secretOrKey: "TheSecret",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new JwtStrategy(options, async (payload,done) => {
        try{
            const customer = await Customer.findOne({ where: {id: payload.id}}) 
            if(customer) return done(null,customer)
            const employee = await Employee.findOne({ where: {id: payload.id}})
            if(employee) return done(null,employee)
            return done(new Error("user not Found"), false)
        }catch(err) {
            return done(null,false);
        }
    })
)