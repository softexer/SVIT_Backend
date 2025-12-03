
var customerModel = require("../../app/Model/admin");
var customervalidations = require("./validations").customervalidations;
var jsonwebtoken = require('jsonwebtoken');
var config = require('../../app/Configfiles/config.json')
module.exports.login = async function login(req, res) {
    try {
        var params = req.body;
        if (params == undefined) {
            return res.json({ response: 0, message: "Please pass user request data" })
        }
        var result = await customervalidations.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Json_Token = jsonwebtoken.sign(
            {}, config.secretkey
        )
        var checkingAdmin_userID = await customerModel.findOne({
            $or: [{
                userID: params.userID
            }]
        }).exec();
        if (!checkingAdmin_userID) {
            return res.json({ response: 0, message: "This userID does not exist" })
        }
        if (checkingAdmin_userID.password !== params.password) {
            return res.json({ response: 0, message: "Password is incorrect" })
        }
        return res.json({ response: 3, message: "Admin login successfully", data: checkingAdmin_userID, token: Json_Token })
    } catch (error) {
        console.log("try catch error", error);
        return res.json({ response: 0, message: "Something went to wrong" })
    }
}
