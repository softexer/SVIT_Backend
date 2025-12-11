var Joi = require('@hapi/joi');
var uservalidationData = {
    signup_Validations: Joi.object({
        firstName: Joi.string().strict().required(),
        lastName: Joi.string().strict().required(),
        dob: Joi.string().strict().required(),
        phoneNumber: Joi.string().strict().required(),
        fatherName: Joi.string().strict().required(),
        motherName: Joi.string().strict().required(),
        aadharNo: Joi.string().optional().allow(''),
        village: Joi.string().strict().required(),
        mandal: Joi.string().strict().required(),
        district: Joi.string().strict().required(),
        collegeName: Joi.string().strict().required(),
        facebookID: Joi.string().optional().allow(''),
        instaID: Joi.string().optional().allow(''),
        emailID: Joi.string().optional().allow(''),
        hallTicketNo:Joi.string().optional().allow(),
        applicationNo:Joi.string().optional().allow()

    }),
    customervalidations: Joi.object({
        userID: Joi.string().strict().required(),
        password: Joi.string().strict().required()
    })
}
module.exports = uservalidationData