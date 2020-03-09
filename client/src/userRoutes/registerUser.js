const db = require("./db");
const passport = require("passport");
const jwtSecret = require(process.env.CLIENT_SECRET);
const jwt = require("jsonwebtoken");

module.exports = app => {
    app.post("/registerUser", (req, res, next) => {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };
        db.User.create({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: token.username,
            password: token.password
        }).then((user) => {
            passport.authenticate("register", (err, user, info) => {
                if (err) {
                    console.log(err);
                }
                if (info !== undefined) {
                    console.log("user already taken");
                    console.log(info.message);
                    res.send(info.message);
                } else {
                    const sensitiveData = {
                        username: req.body.username,
                        password: req.body.password
                    };
                    sensitiveData.save().then({} => {
                        const token = jwt.sign({ username: sensitiveData.username }, "jwt_secret");
                        res.json({ token: token });
                    }).catch((err) => {
                        res.status().json({});
                    })
                }
            });
            console.log("user now registered");
            res.json(user);
            res.status(200).send({ message: "user created in db" });
        })
    });
};