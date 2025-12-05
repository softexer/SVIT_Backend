var Joi = require('@hapi/joi');
var AdminValidationsData = {
    signup_Validations: Joi.object({
        userID: Joi.string().strict().required(),
        firstName: Joi.string().strict().required(),
        lastName: Joi.string().strict().required(),
        password: Joi.string().strict().required()


    }),
    customervalidations: Joi.object({
        userID: Joi.string().strict().required(),
        password: Joi.string().strict().required()
    }),

    testvalidations: Joi.object({
        userID: Joi.string().strict().required(),
        category: Joi.string().strict().required(),
        type:Joi.string().optional().allow(''),
        testName: Joi.string().trim().required(),
        testNumber: Joi.number().required(),
    })
}
module.exports = AdminValidationsData