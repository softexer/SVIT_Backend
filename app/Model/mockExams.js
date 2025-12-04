
const mongoose = require("mongoose");
let schema = mongoose.Schema;
var TestSchema = new schema({
    userID: {
        required: true,
        type: String,
        unique: true,
    },

    category: {
        type: String,
        enum: ["preliminary", "application", "hallticket", "videolectures"],
        required: false,
    },

    preliminary: [{
        testName: { type: String, required: true, trim: true },
        testNumber: { type: Number, required: true },
        testURL: { type: String, default: "" },
        questions: {
            type: Array,
            default: []
        }
    }],
    application: [{
        testName: { type: String, required: true, trim: true },
        testNumber: { type: Number, required: true },
        testURL: { type: String, default: "" },
    }],
    hallticket: [{
        testName: { type: String, required: true, trim: true },
        testNumber: { type: Number, required: true },
        testURL: { type: String, default: "" },
    }],
    videolectures: [{
        testName: { type: String, required: true, trim: true },
        testNumber: { type: Number, required: true },
        testURL: { type: String, default: "" },
    }],



});
module.exports = mongoose.model("mockTest", TestSchema);


