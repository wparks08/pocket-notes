const db = require("../db");
const jwtSecret = process.env.CLIENT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateLoginInput = require("../validation/login");
// Load User model

module.exports = app => {
    app.post("/loginUser", (req, res, next) => {
        const { error, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(error);
        }
        const email = req.body.email;
        const password = req.body.password;
        db.User.findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        firstName: user.firstName,
                        email: user.email
                    };
                    console.log("logged in!");
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
            });
        });
    });
};

