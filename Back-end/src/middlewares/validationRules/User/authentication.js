const { body} = require('express-validator');
const  validateData = require("../../validateData")

function authenticationRules(req, res, next) {

    const validationRules = [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min: 8}).withMessage('the password must contain at least 8 characters')
    ];
    
    validateData(validationRules,req, res, next)

}

module.exports = authenticationRules;
