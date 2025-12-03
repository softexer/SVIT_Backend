var { testValidation } = require('./validations');
var AdminModel = require('../../app/Model/admin');
var mocktestModel = require('../../app/Model/mockExams')
var RandomGenerate_password = require('generate-password');
var path = require('path')
module.exports.testUploaddata = async function testUploaddata(req, res) {
    try {
        var params = JSON.parse(req.body.testdata);
        if (params == undefined) {
            return res.json({ response: 0, message: "Please pass user request data" })
        }
        var result = await testValidation.validate(params);
        if (result.error) {
            res.statusCode = 400;
            return res.json({ response: 0, message: result.error.details[0].message })
        }
        var Checking_userID = await AdminModel.findOne({ userID: params.userID }).exec();
        if (Checking_userID) {

            if (req.files != null) {
                var objectkey = Object.keys(req.files);
                if (objectkey.includes("test")) {
                    var file = req.files.test;
                    var date = new Date();
                    var randomid = RandomGenerate_password.generate({
                        length: 5,
                        lowercase: true,
                        uppercase: true,
                        symbols: false,
                        numbers: true,
                        excludeSimilarCharacters: true

                    })
                    console.log("randomid", randomid)
                    var id = date.getFullYear() + "" + date.getMonth() + "" + date.getDay() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getMilliseconds();
                    var uniqueid = date.getFullYear() + "" + date.getMonth() + "" + date.getDay() + "" + date.getHours() + "" + date.getMinutes()

                    var wegetextname = path.extname(file.name)
                    var filepath = './public/images/tests/' + "svit@" + id + randomid + "m" + wegetextname;
                    var dbpath = '/images/tests/' + "svit@" + id + randomid + "m" + wegetextname;

                    file.mv(filepath, async (err) => {
                        if (err) {
                            return res.json({ response: 0, message: "FileUpload something went to wrong" })
                        } else {

                            const testData = {
                                testName: params.testName,
                                testNumber: params.testNumber,
                                testURL: dbpath || ""
                            };
                            var testtype = params.category;

                            const updateddata = await mocktestModel.findOneAndUpdate(
                                { userID: params.userID },
                                {
                                    $push: {
                                        testtype: testData
                                    }
                                },
                                { new: true, upsert: true }
                            );


                            if (updateddata) {
                                return res.json({ response: 3, message: "Mock tests uploaded successfully" })
                            } else {
                                return res.json({ response: 0, message: "Mock tests uploaded failure" })
                            }
                        }
                    })
                } else {
                    return res.json({ response: 0, message: "Please pass correct test key" })
                }


            } else {
                return res.json({ response: 0, message: "Pleae upload mock tests" })

            }
        } else {
            return res.json({ response: 0, message: "userID data not found" })
        }


    } catch (error) {
        console.log("try catch error", error);
        return res.json({ response: 0, message: "Something went to wrong" })
    }
}

const fs = require("fs");
const path = require("path");

module.exports.deleteMockTest = async function deleteMockTest(req, res) {
    try {
        const { userID, testNumber,category } = req.body;

      
        if (!userID || !testNumber) {
            return res.json({ response: 0, message: "userID & testNumber are required" });
        }

       

        // -----------------------------
        // Find the mock test document
        // -----------------------------
        const mockData = await mocktestModel.findOne({ userID }).exec();
        if (!mockData) {
            return res.json({ response: 0, message: "Mock test data not found" });
        }


        // Find the test to delete
        const testItem = mockData.category.find(t => t.testNumber == testNumber);

        if (!testItem) {
            return res.json({ response: 0, message: "Test not found" });
        }

       
        if (testItem.testURL) {
            const fullPath = path.join(__dirname, "../../public", testItem.testURL);

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log("File Deleted:", fullPath);
            } else {
                console.log("File not found:", fullPath);
            }
        }

        // -------------------------------------
        // DELETE TEST FROM ARRAY
        // -------------------------------------
        const updated = await mocktestModel.findOneAndUpdate(
            { userID },
            {
                $pull: {
                    category: { testNumber: testNumber }
                }
            },
            { new: true }
        );

        return res.json({
            response: 3,
            message: "Mock test deleted successfully"
        });

    } catch (error) {
        console.log("Delete error:", error);
        return res.json({ response: 0, message: "Something went wrong" });
    }
};




