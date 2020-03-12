const db = require("./db");
const jwtSecret = require(process.env.CLIENT_SECRET);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../client/src/validation/login");
// Load User model

module.exports = app => {
    app.post("/loginUser", (req, res, next) => {
        const { error, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(error);
        }
        const username = req.body.username;
        const password = req.body.password;
        db.User.findOne({ username }).then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        firstName: user.firstName,
                        username: user.username
                    };
                    jwt.sign(
                        payload,
                        jwtSecret,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                auth: true,
                                token: token
                            })
                        }
                    );
                } else {
                    return res.status(400).json({ passwordIncorrect: "Password is incorrect" })
                }
            })
        });
    };
