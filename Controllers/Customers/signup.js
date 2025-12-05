var { signup_Validations } = require('./validations');
var CustomerModel = require('../../app/Model/Customer');

module.exports.signup = async function signup(req, res) {
    try {
        var params = req.body;
        if (params == undefined) {
            return res.json({ response: 0, message: "Please pass user request data" })
        }
        var result = await signup_Validations.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var checkingAdmin_userID = await CustomerModel.findOne({ phoneNumber: params.phoneNumber }).exec();
        if (checkingAdmin_userID) {
            return res.json({ response: 0, message: "Already registered this mobile number" })
        } else {
            var userIDData = "svit" + "@" + new Date().getTime();
            var insertadmin = await CustomerModel.insertMany([{
                userID: userIDData,
                password: params.dob,
                firstName: params.firstName,
                lastName: params.lastName,
                dob: params.dob,
                phoneNumber:params.phoneNumber,
                fatherName:params.fatherName,
                motherName: params.motherName,
                aadharNo: params.aadharNo,
                village: params.village,
                mandal:params.mandal,
                district: params.district,
                collegeName: params.collegeName,
                facebookID: params.facebookID,
                instaID: params.instaID,
                emailID: params.emailID,
                isMobileVerified:true,
                hallTicketNo:params.hallTicketNo,
                applicationNo:params.applicationNo
            }])
            if (insertadmin.length == 0) {
                return res.json({ response: 0, message: "User signup failed" })
            } else {
                return res.json({ response: 3, message: "User signup successfully",password:params.dob,userID:userIDData })
            }
        }
    } catch (error) {
        console.log("try catch error", error);
        return res.json({ response: 0, message: "Something went to wrong" })
    }
}