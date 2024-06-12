const { body} = require('express-validator');
const  validateData = require("../../validateData")

function updateEventRules(req, res, next) {

    const validationRules = [
        body('title').optional(),
        body('description').optional(),
        body('start').optional(),
        body('end').optional(),
        body('allDay').isBoolean().optional(),
        body('userId').isNumeric().optional()
    ];
    
    validateData(validationRules,req, res, next)

}

module.exports = updateEventRules;