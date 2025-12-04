var { signup_Validations } = require('./validations');
var CustomerModel = require('../../app/Model/admin');
var mocktestModel = require('../../app/Model/mockExams')
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
        var checkingAdmin_userID = await CustomerModel.findOne({ userID: params.userID }).exec();
        if (checkingAdmin_userID) {
            return res.json({ response: 0, message: "Already having this account" })
        } else {
            // var userIDData = "svit" + "@" + new Date().getTime();
            var insertadmin = await CustomerModel.insertMany([{
                userID: params.userID,
                password: params.password,
                firstName: params.firstName,
                lastName: params.lastName
            }])
            if (insertadmin.length == 0) {
                return res.json({ response: 0, message: "User signup failed" })
            } else {

                var mocktestModeldata = await mocktestModel.insertMany([{
                    userID: params.userID,
                    preliminary: [],
                    application:[],
                    hallticket:[],
                    videolectures:[]
                }])
                return res.json({ response: 3, message: "Admin signup successfully" })
            }
        }
    } catch (error) {
        console.log("try catch error", error);
        return res.json({ response: 0, message: "Something went to wrong" })
    }
}