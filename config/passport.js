const bcrypt = require("bcryptjs");
const jwtSecret = process.env;
const db = require("../db");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret.CLIENT_SECRET
};
module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (jwtPayload, done) => {
            db.User.findOne({
                jwtPayload: username
            }).then(user => {
                if (user) {
                    console.log("user found in db in passport");
                    done(null, user);
                } else {
                    console.log("user not found in db")
                    done(null, false);
                }
            });
        })
    )
};
