const db = require("./db");
const jwtSecret = require(process.env.CLIENT_SECRET);
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = app => {
    app.get("/loginUser", (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    db.User.findOne({
                        username: user.username
                    }).then(user => {
                        const token = jwt.sign({ username: user.username }, jwtSecret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: "user found in db"
                        });
                    });
                });
            }
        })(req, res, next);
    });
};