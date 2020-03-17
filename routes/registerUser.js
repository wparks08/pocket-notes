const db = require("../db");
const validateRegisterInput = require("../validation/register");
const bcrypt = require("bcryptjs");

module.exports = app => {
    app.post("/registerUser", (req, res, next) => {
        console.log(req.body);
        const { error, isValid } = validateRegisterInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                }).then(user => {
                    console.log(user);
                    res.status(200).json(user);
                });
            });
        });

    });
};
