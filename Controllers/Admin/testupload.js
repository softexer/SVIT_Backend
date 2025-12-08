var testValidation = require('./validations').testvalidations;
var AdminModel = require('../../app/Model/admin');
var mocktestModel = require('../../app/Model/mockExams')
var RandomGenerate_password = require('generate-password');
var path = require('path')
module.exports.testUploaddata112 = async function testUploaddata112(req, res) {
    try {
        var params = JSON.parse(req.body.testdata);
        console.log("body", params)
        if (params == undefined) {
            return res.json({ response: 0, message: "Please pass user request data" })
        }
        var result = await testValidation.validate(params);

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
                            console.log("testtype", testtype)
                            const updateddata = await mocktestModel.findOneAndUpdate(
                                { userID: params.userID },
                                {
                                    $push: {
                                        [testtype]: testData
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

module.exports.deleteMockTest = async function deleteMockTest(req, res) {
    try {
        const { userID, testNumber, category } = req.body;


        if (!userID || !testNumber || !category) {
            return res.json({ response: 0, message: "userID & testNumber are required" });
        }



        // -----------------------------
        // Find the mock test document
        // -----------------------------

        const mockData = await mocktestModel.findOne(
            { userID },
            { [category]: 1 }   // ✅ dynamic projection
        ).exec();
        if (!mockData) {
            return res.json({ response: 0, message: "Mock test data not found" });
        }


        // Find the test to delete
        const testItem = mockData[category].find(
            t => String(t.testNumber) === String(testNumber)
        );
        console.log(" mockData.category", testItem)
        if (!testItem) {
            return res.json({ response: 0, message: "Test not found" });
        }


        if (testItem.testURL) {
            console.log("testURL")
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
                    [category]: { testNumber: testNumber }   // ✅ dynamic field
                }
            },
            { new: true }
        );
        console.log(updated)
        return res.json({
            response: 3,
            message: "Mock test deleted successfully"
        });

    } catch (error) {
        console.log("Delete error:", error);
        return res.json({ response: 0, message: "Something went wrong" });
    }
};

module.exports.fetchmocktest = async function fetchmocktest(req, res) {
    try {

        const { userID } = req.body;


        if (!userID) {
            return res.json({ response: 0, message: "userID is required" });
        }


        var checkingAdmin_userID = await mocktestModel.findOne({
            $or: [{
                userID: userID
            }]
        }).exec();
        if (!checkingAdmin_userID) {
            return res.json({ response: 0, message: "This userID does not exist" })
        } else {
            return res.json({ response: 3, message: "Fetch mock test data successfully", data: checkingAdmin_userID })

        }
    } catch (error) {
        console.log("try catch error", error);
        return res.json({ response: 0, message: "Something went to wrong" })
    }
}




const mammoth = require("mammoth");

module.exports.testUploaddata = async function testUploaddata(req, res) {
    try {
        var params = JSON.parse(req.body.testdata);

        if (!params) {
            return res.json({ response: 0, message: "Please pass user request data" })
        }

        var result = await testValidation.validate(params);
        if (result.error) {
            return res.status(400).json({ response: 0, message: result.error.details[0].message });
        }

        var Checking_userID = await AdminModel.findOne({ userID: params.userID }).exec();
        if (!Checking_userID) {
            return res.json({ response: 0, message: "userID data not found" });
        }

        if (!req.files || !req.files.test) {
            return res.json({ response: 0, message: "Please upload mock test file" });
        }

        var file = req.files.test;
        var ext = path.extname(file.name);
        console.log("etxt", true || fasle)
        if (ext !== ".docx" && ext !== ".mp4") {
            return res.json({ response: 0, message: "Only .docx format allowed" });
        }

        var saveName = `svit_${Date.now()}` + ext;
        var filePath = `./public/images/tests/${saveName}`;
        var dbpath = '/images/tests/' + saveName;

        // Step 1 → Save file to server
        file.mv(filePath, async (err) => {
            if (err) {
                return res.json({ response: 0, message: "File upload failed" });
            }

            var testData;
            if (ext == ".mp4") {

                // Step 4 → Save JSON in DB
                const testData = {
                    testName: params.testName,
                    testNumber: params.testNumber,
                    testURL: dbpath,
                    type: params.type || "",
                    questions: ""   // store JSON
                };
                let testtype = params.category;

                const updated = await mocktestModel.findOneAndUpdate(
                    { userID: params.userID },
                    [
                        {
                            $set: {
                                videolectures: {
                                    $cond: {
                                        if: { $isArray: "$videolectures" },
                                        then: { $concatArrays: ["$videolectures", [testData]] },
                                        else: [testData]
                                    }
                                }
                            }
                        }
                    ],
                    {
                        upsert: true,
                        new: true,
                        updatePipeline: true   // ✅ REQUIRED FIX
                    }
                );


            } else {
                // Step 2 → Convert docx → Raw text
                const { value } = await mammoth.extractRawText({ path: filePath });

                // Step 3 → Convert raw text → JSON
                const questions = convertToQuestions(value);

                // Step 4 → Save JSON in DB
                const testData = {
                    testName: params.testName,
                    testNumber: params.testNumber,
                    testURL: dbpath,
                    type: params.type || "",
                    questions: questions   // store JSON
                };
            }


            let testtype = params.category;
            console.log("type", testtype)


            const updated = await mocktestModel.findOneAndUpdate(
                { userID: params.userID },
                {
                    $push: {
                        [testtype]: testData   // ✅ Dynamic push
                    }
                },
                {
                    new: true,    // ✅ Returns updated document
                    upsert: true  // ✅ Creates document if not exists
                }
            );

            console.log(updated)
            return res.json({
                response: 3,
                message: "Mock test uploaded & converted successfully",
                filepath: dbpath
                //  questions: questions
            });
        });

    } catch (error) {
        console.log("Upload error:", error);
        return res.json({ response: 0, message: "Something went wrong" });
    }
};

function convertToQuestions(rawText) {
    const lines = rawText.split("\n").map(l => l.trim()).filter(l => l !== "");

    let questions = [];
    let q = null;

    lines.forEach(line => {
        if (line.match(/^Q\d+/i)) {
            if (q) questions.push(q);

            q = {
                id: questions.length + 1,
                text: line.replace(/^Q\d+:/i, "").trim(),
                options: [],
                correctAnswer: null
            };
        }
        else if (line.match(/^\(A\)/i) || line.match(/^\([A-D]\)/i)) {
            q.options.push(line.substring(3).trim());
        }
        else if (line.startsWith("ANSWER")) {
            const letter = line.split(":")[1].trim();
            q.correctAnswer = letter.charCodeAt(0) - 65;
        }
    });

    if (q) questions.push(q);
    return questions;
}

