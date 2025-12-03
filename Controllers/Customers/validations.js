var Joi = require('@hapi/joi');
var AdminValidationsData = {
    signup_Validations: Joi.object({
        userID: Joi.string().strict().required(),
        firstName: Joi.string().strict().required(),
        lastName: Joi.string().strict().required(),
        dob: Joi.string().strict().required(),
        phoneNumber: Joi.string().strict().required(),
        fatherName: Joi.string().strict().required(),
        motherName: Joi.string().strict().required(),
        aadharNo: Joi.string().strict().required(),
        village: Joi.string().strict().required(),
        mandal: Joi.string().strict().required(),
        district: Joi.string().strict().required(),
        collegeName: Joi.string().strict().required(),
        facebookID: Joi.string().strict().required(),
        instaID: Joi.string().strict().required(),
        emailID: Joi.string().strict().required(),

    }),
    customervalidations: Joi.object({
        userID: Joi.string().strict().required(),
        password: Joi.string().strict().required()
    })
}
module.exports = AdminValidationsData