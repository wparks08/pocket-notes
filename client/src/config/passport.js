const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;
const jwtSecret = process.env;
const db = require("./db");

const passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    JWTStrategy = require("passport-jwt").Strategy,
    ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
    "register",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            session: false
        },
        (username, password, done) => {
            try {
                db.User.findOne({ username: username }).then(user => {
                    if (user !== null) {
                        console.log("username taken");
                        return done(null, false, { message: "username taken" });
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            db.User.create({ username, password: hashedPassword }).then(user => {
                                console.log("user created");
                                return done(null, user, { message: "user created" });
                            });
                        });
                    }
                });
            } catch (err) {
                done(err, { message: error });
            }
        }
    )
);
passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            session: false
        },
        (username, password, done) => {
            try {
                db.User.findOne({ username: username }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: "username does not exist" });
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if (response !== true) {
                                console.log("passwords do not match");
                                return done(null, false, { message: "passwords do not match" });
                            } else {
                                console.log("user found and authenticated");
                                return done(null, user, { message: "user found and authenticated" });
                            }
                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        }
    )
);
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret.CLIENT_SECRET
};
passport.use(
    "jwt",
    new JWTStrategy(opts, (jwtPayload, done) => {
        try {
            db.User.findOne({
                username: jwtPayload.id
            }).then(user => {
                if (user) {
                    console.log("user found in db in passport");
                    done(null, user);
                } else {
                    console.log("user not found in db")
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    })
);
