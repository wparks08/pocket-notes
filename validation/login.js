const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let error = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        error.name = "Username must be entered";
    }

    if (Validator.isEmpty(data.password)) {
        error.name = "Password cannot be empty";
    }
    return {
        error,
        isValid: isEmpty(error)
    };
};
