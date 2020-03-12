const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.username)) {
        error.name = "Username must be entered";
    }

    if (Validator.isEmpty(data.password)) {
        error.name = "Password cannot be empty";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};