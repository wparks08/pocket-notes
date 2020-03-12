const db = require("../db");
const validateRegisterInput = require("../validation/register");
const bcrypt = require("bcryptjs");

module.exports = app => {
    app.post("/registerUser", (req, res, next) => {
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
                req.body.password = hash;
                res.json();
            });
        });
        db.User.create({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }).then(user => {
            res.json(user, { message: "User created in db" });
        });
    });
};
