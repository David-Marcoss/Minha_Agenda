const { body} = require('express-validator');
const  validateData = require("../../validateData")

function createEventRules(req, res, next) {

    const validationRules = [
        body('title'),
        body('description').optional(),
        body('start'),
        body('end'),
        body('allDay').isBoolean(),
        body('userId').isNumeric()
    ];
    
    validateData(validationRules,req, res, next)

}

module.exports = createEventRules;